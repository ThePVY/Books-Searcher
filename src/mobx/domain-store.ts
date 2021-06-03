import booksAPI, { BookData } from '@/api/books-api'
import { getCoverUrl } from '@/api/covers-api'
import searchAPI, { SearchData } from '@/api/search-api'
import { checkAndParse, addToSessionStorage } from '@/utils/utils'
import { autorun, makeAutoObservable } from 'mobx'
import EditionInfo, { IBooksInfo } from './edition-info'

export class DomainStore {
  allBooks = (checkAndParse('allBooks') || []) as EditionInfo[]
  pageSize = 20
  currentPage = 1
  searching = false
  imageLoading = false
  lastQuery = checkAndParse('lastQuery') as string
  searchCount = (checkAndParse('searchCount') || 0) as number

  constructor () {
    makeAutoObservable(this)
    autorun(() => addToSessionStorage({
      allBooks: this.allBooks,
      lastQuery: this.lastQuery,
      searchCount: this.searchCount
    }))
  }

  * getAllBooks (search: string): Generator<Promise<SearchData>, void, SearchData> {
    this.searching = true
    this.searchCount += 1
    try {
      const searchData = yield searchAPI.getBooks(search)
      this.lastQuery = search
      this.searching = false
      this.allBooks = retrieveBooksInfo(searchData)
    } catch (err) {
      this.lastQuery = search
      this.searching = false
    }
  }

  * getAdditionalInfo(): Generator<Promise<BookData[]>, void, BookData[]> {
    try {
      const info = yield Promise.all([...this.itemsOnPage.map((edition) => booksAPI.getBook(edition.isbn))])
      for (let i = 0; i < this.itemsOnPage.length; i++) {
        this.itemsOnPage[i].number_of_pages = info[i].number_of_pages
        this.itemsOnPage[i].publish_date = info[i].publish_date
        this.itemsOnPage[i].publishers = info[i].publishers
        this.itemsOnPage[i].mediumCover = getCoverUrl(this.itemsOnPage[i].isbn, 'M')
        this.itemsOnPage[i].largeCover = getCoverUrl(this.itemsOnPage[i].isbn, 'L')
      }
    } catch (err) {
      console.log(err)
    }
  }

  setCurrentPage(page: number): void {
    this.currentPage = page
  }

  setSearching (value: boolean): void {
    this.searching = value
  }

  setImageLoading (value: boolean): void {
    this.imageLoading = value
  }

  get uniqueTitles (): string[] {
    const acc = {} as { [title: string]: number }
    this.allBooks.forEach(edition => {
      acc[edition.title] = acc[edition.title] + 1 || 1
    })
    return Object.keys(acc)
  }

  get pagesNum (): number {
    return Math.ceil(this.allBooks.length / this.pageSize)
  }

  get itemsOnPage (): EditionInfo[] {
    const startIdx = (this.currentPage - 1) * this.pageSize
    const endIdx = this.currentPage * this.pageSize - 1
    const itemsOnPage = [] as EditionInfo[]
    for (let i = startIdx; i <= endIdx; i++) {
      if (this.allBooks[i]) {
        itemsOnPage.push(this.allBooks[i])
      }
    }
    return itemsOnPage
  }
}

function retrieveBooksInfo (searchResponse: SearchData): EditionInfo[] {
  const { docs } = searchResponse
  const allBooks = {} as IBooksInfo
  docs.forEach(doc => {
    if (!doc.has_fulltext || !doc.isbn) return
    const author = (doc.author_name && doc.author_name[0]) || 'Unknown author'
    const { title } = doc
    doc.isbn.forEach(isbn => {
      if (allBooks[isbn] || isbn.length <= 9) return
      allBooks[isbn] = { isbn, author, title }
    })
  })
  return Object.values(allBooks)
}

export default new DomainStore()