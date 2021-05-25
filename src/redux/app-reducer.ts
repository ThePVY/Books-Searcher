import booksAPI, { BookData } from '@/api/books-api'
import { getCoverUrl } from '@/api/covers-api'
import searchAPI, { SearchData } from '@/api/search-api'
import { ActionT } from '@/types/common-types'
import { checkAndParse, useSessionStorage } from '@/utils/utils'
import { ThunkAction } from 'redux-thunk'
import { RootStateT } from './store-redux'

const SET_ALL_BOOKS = 'app/SET_ALL_BOOKS'
const SET_UNIQUE_TITLES = 'app/SET_UNIQUE_TITLES'
const SET_PAGES_NUM = 'app/SET_PAGES_NUM'
const SET_CURRENT_PAGE = 'app/SET_CURRENT_PAGE'
const SET_ITEMS_ON_PAGE = 'app/SET_ITEMS_ON_PAGE'
const SET_ADDITIONAL_INFO = 'app/SET_ADDITIONAL_INFO'
const SET_COVERS_M = 'app/SET_COVERS_M'
const SET_COVERS_L = 'app/SET_COVERS_L'
const SET_SEARCHING = 'app/SET_SEARCHING'
const SET_LAST_QUERY = 'app/SET_LAST_QUERY'
const INC_SEARCH_COUNT = 'app/INC_SEARCH_COUNT'

type setAllBooksT = ActionT<typeof SET_ALL_BOOKS, IEditionInfo[]>
type setUniqueTitlesT = ActionT<typeof SET_UNIQUE_TITLES, string[]>
type setPagesNumT = ActionT<typeof SET_PAGES_NUM, number>
type setCurrentPageT = ActionT<typeof SET_CURRENT_PAGE, number>
type setItemsOnPageT = ActionT<typeof SET_ITEMS_ON_PAGE, IEditionInfo[]>
type setAdditionalInfoT = ActionT<typeof SET_ADDITIONAL_INFO, BookData[]>
type setCoversMT = ActionT<typeof SET_COVERS_M, string[]>
type setCoversLT = ActionT<typeof SET_COVERS_L, string[]>
type setSearchingT = ActionT<typeof SET_SEARCHING, boolean>
type setLastQueryT = ActionT<typeof SET_LAST_QUERY, string>
type incSearchCountT = ActionT<typeof INC_SEARCH_COUNT, number>

type AppAction =
  | setAllBooksT
  | setUniqueTitlesT
  | setAdditionalInfoT
  | setCoversMT
  | setCoversLT
  | setPagesNumT
  | setCurrentPageT
  | setItemsOnPageT
  | setSearchingT
  | setLastQueryT
  | incSearchCountT

export const actionCreator = {
  setAllBooks(books: IEditionInfo[]): setAllBooksT {
    return { type: SET_ALL_BOOKS, payload: books }
  },
  setUniqueTitles(titles: string[]): setUniqueTitlesT {
    return { type: SET_UNIQUE_TITLES, payload: titles }
  },
  setPagesNum(pagesNum: number): setPagesNumT {
    return { type: SET_PAGES_NUM, payload: pagesNum }
  },
  setCurrentPage(currPage: number): setCurrentPageT {
    return { type: SET_CURRENT_PAGE, payload: currPage }
  },
  setItemsOnPage(books: IEditionInfo[]): setItemsOnPageT {
    return { type: SET_ITEMS_ON_PAGE, payload: books }
  },
  setAdditionalInfo(publishers: BookData[]): setAdditionalInfoT {
    return { type: SET_ADDITIONAL_INFO, payload: publishers }
  },
  setCoverM(coversData: string[]): setCoversMT {
    return { type: SET_COVERS_M, payload: coversData }
  },
  setCoverL(coversData: string[]): setCoversLT {
    return { type: SET_COVERS_L, payload: coversData }
  },
  setSearching(isSearching: boolean): setSearchingT {
    return { type: SET_SEARCHING, payload: isSearching }
  },
  setLastQuery(query: string): setLastQueryT {
    return { type: SET_LAST_QUERY, payload: query }
  },
  incSearchCount(): incSearchCountT {
    return { type: INC_SEARCH_COUNT }
  }
}

type ThunkActionT = ThunkAction<void, RootStateT, never, AppAction>

export const thunkCreator = {
  getAllBooks(search: string): ThunkActionT {
    return async (dispatch, getState) => {
      dispatch(actionCreator.setSearching(true))
      dispatch(actionCreator.incSearchCount())
      const serchData = await searchAPI.getBooks(search)
      if (!serchData) {
        dispatch(actionCreator.setLastQuery(search))
        dispatch(actionCreator.setSearching(false))
        return
      }
      const books = retrieveBooksInfo(serchData)
      const uniqueTitles = getUniqueTitles(books)
      dispatch(actionCreator.setUniqueTitles(uniqueTitles))
      const { pageSize } = getState().app
      dispatch(actionCreator.setAllBooks(books))
      const pagesNum = Math.ceil(books.length / pageSize)
      dispatch(actionCreator.setPagesNum(pagesNum))
      dispatch(thunkCreator.getItemsOnPage(1))
      dispatch(actionCreator.setLastQuery(search))
      dispatch(actionCreator.setSearching(false))
      useSessionStorage(getState().app)
    }
  },
  getItemsOnPage(page: number): ThunkActionT {
    return (dispatch, getState) => {
      const { allBooks, pageSize } = getState().app
      const itemsOnPage = getItemsOnPage(allBooks, page, pageSize)
      dispatch(actionCreator.setCurrentPage(page))
      dispatch(actionCreator.setItemsOnPage(itemsOnPage))
      dispatch(thunkCreator.getAdditionalInfo())
      useSessionStorage({
        currentPage: page,
      })
    }
  },
  getAdditionalInfo(): ThunkActionT {
    return async (dispatch, getState) => {
      const { itemsOnPage } = getState().app
      if (itemsOnPage === []) return
      const data = await Promise.all([...itemsOnPage.map((book) => booksAPI.getBook(book.isbn))])
      const mediumCovers = itemsOnPage.map((item) => getCoverUrl(item.isbn, 'M'))
      const largeCovers = itemsOnPage.map((item) => getCoverUrl(item.isbn, 'L'))
      dispatch(actionCreator.setAdditionalInfo(data))
      dispatch(actionCreator.setCoverM(mediumCovers))
      dispatch(actionCreator.setCoverL(largeCovers))
      useSessionStorage({ itemsOnPage: getState().app.itemsOnPage })
    }
  }
}

function retrieveBooksInfo(searchResponse: SearchData): IEditionInfo[] {
  const { docs } = searchResponse
  const allBooks = {} as IBooksInfo
  docs.forEach((doc) => {
    if (!doc.has_fulltext || !doc.isbn) return
    const author = doc.author_name[0]
    const { title } = doc
    doc.isbn.forEach((isbn) => {
      if (allBooks[isbn] || isbn.length <= 9) return
      allBooks[isbn] = { isbn, author, title }
    })
  })
  return Object.values(allBooks)
}


function getUniqueTitles(allBooks: IEditionInfo[]): string[] {
  const acc = {} as { [title: string]: number }
  allBooks.forEach((edition) => {
    acc[edition.title] = acc[edition.title] + 1 || 1
  })
  return Object.keys(acc)
}

function getItemsOnPage(
  allBooks: IEditionInfo[],
  currentPage: number,
  pageSize: number
): IEditionInfo[] {
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = currentPage * pageSize - 1
  const itemsOnPage = [] as IEditionInfo[]
  for (let i = startIdx; i <= endIdx; i++) {
    if (allBooks[i]) {
      itemsOnPage.push(allBooks[i])
    }
  }
  return itemsOnPage
}

export interface IBooksInfo {
  [isbn: string]: IEditionInfo
}

export interface IEditionInfo {
  isbn: string
  title: string
  author: string
  publishers?: string[]
  number_of_pages?: number
  publish_date?: string
  mediumCover?: string
  largeCover?: string
}

const initialState = {
  allBooks: (checkAndParse('allBooks') || []) as IEditionInfo[],
  uniqueTitles: (checkAndParse('uniqueTitles') || []) as string[],
  pageSize: 20,
  pagesNum: checkAndParse('pagesNum') as number,
  currentPage: checkAndParse('currentPage') as number,
  itemsOnPage: (checkAndParse('itemsOnPage') || []) as IEditionInfo[],
  searching: false,
  lastQuery: checkAndParse('lastQuery') as string,
  searchCount: (checkAndParse('lastQuery') || 0) as number
}
export type AppStateT = typeof initialState

export const appReducer = (state = initialState, action: AppAction): AppStateT => {
  switch (action.type) {
    case SET_ALL_BOOKS:
      return { ...state, allBooks: action.payload }
    case SET_UNIQUE_TITLES:
      return { ...state, uniqueTitles: action.payload }
    case SET_PAGES_NUM:
      return { ...state, pagesNum: action.payload }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }
    case SET_ITEMS_ON_PAGE:
      return { ...state, itemsOnPage: action.payload }
    case SET_ADDITIONAL_INFO:
      return {
        ...state,
        itemsOnPage: state.itemsOnPage.map((edition, i) => ({
          ...edition,
          ...action.payload[i]
        }))
      }
    case SET_COVERS_M:
      return {
        ...state,
        itemsOnPage: state.itemsOnPage.map((edition, i) => ({
          ...edition,
          mediumCover: action.payload[i]
        }))
      }
    case SET_COVERS_L:
      return {
        ...state,
        itemsOnPage: state.itemsOnPage.map((edition, i) => ({
          ...edition,
          largeCover: action.payload[i]
        }))
      }
    case SET_SEARCHING:
      return { ...state, searching: action.payload }
    case SET_LAST_QUERY:
      return { ...state, lastQuery: action.payload }
    case INC_SEARCH_COUNT:
      return { ...state, searchCount: state.searchCount + 1 }
    default:
      return state
  }
}

/*---------------------------------------------------------------------------------*/
