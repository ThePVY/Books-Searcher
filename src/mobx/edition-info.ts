import { makeAutoObservable } from "mobx"

export default class EditionInfo {
  isbn = null as string
  title = null as string
  author = null as string
  publishers? = [] as string[]
  number_of_pages? = null as number
  publish_date? = null as string
  mediumCover? = null as string
  largeCover? = null as string

  constructor(isbn: string, title: string, author: string) {
    this.isbn = isbn
    this.title = title
    this.author = author
    makeAutoObservable(this)
  }
}

export interface IBooksInfo {
  [isbn: string]: EditionInfo
}
