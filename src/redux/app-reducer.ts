import { ActionT } from '@/types/common-types'
import { ThunkAction } from 'redux-thunk'
import { RootStateT } from './store-redux'

const SET_ISBN_BOOKS = 'app/SET_ISBN_BOOKS'

type SetIsbnBooks = ActionT<typeof SET_ISBN_BOOKS, IBookInfo[]>

type AppActionT = SetIsbnBooks

export const actionCreator = {
  
}

type ThunkActionT<R> = ThunkAction<R, RootStateT, undefined, AppActionT>


export interface IBookInfo {
  isbn: string
  author: string
  title: string
}

export interface IAppState {
  allBooks: IBookInfo[]
}

const initialState = {} as IAppState

export const appReducer = (state = initialState, action: AppActionT): IAppState => {
  switch (action.type) {
    
    default:
      return state
  }
}

/*---------------------------------------------------------------------------------*/
