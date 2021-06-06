import { createBrowserHistory, createPath } from 'history'
import { autorun, makeAutoObservable } from 'mobx'
import { RootStore } from './store'

export default class HistoryController {
  rootStore: RootStore = null
  history = createBrowserHistory()
  book: string = null
  prevBook: string = null
  page: number = null
  unlisten

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeAutoObservable(this)

    this.unlisten = this.history.listen(({ location }) => {
      const [, book, page] = decodeURI(location.pathname).split('/')
      if (this.prevBook !== book) {
        Promise.resolve(this.rootStore.domainStore.getAllBooks(book, Number(page))).then(() => {
          this.rootStore.uiStore.setHintsMode(true)
        })
      } else {
        this.rootStore.domainStore.setCurrentPage(Number(page))
        this.rootStore.domainStore.getAdditionalInfo()
      }
      this.prevBook = book
      console.log(book, page)
    })

    autorun(() => {
      this.history.replace(this.url)
    })
  }

  startSearch(searchedBook: string): void {
    this.book = searchedBook
    this.page = 1
  }

  getBooksOnPage(page: number): void {
    this.page = page
  }

  get url(): string {
    if (this.book) {
      return createPath({
        pathname: 'http://localhost:3000',
        search: `?book=${this.book}?page=${this.page}`
      })
    }
    return `http://localhost:3000`
  }
}
