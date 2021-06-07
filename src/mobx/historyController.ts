import { createBrowserHistory } from 'history'
import { autorun, makeAutoObservable } from 'mobx'
import { RootStore } from './store'

export default class HistoryController {
  rootStore: RootStore = null
  history = createBrowserHistory()
  book
  prevBook = ''
  page
  isbn
  unlisten

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    
    const params = new URLSearchParams(this.history.location.search)
    this.book = params.get('book') || ''
    this.page = Number(params.get('page'))
    this.isbn = params.get('isbn')

    makeAutoObservable(this)

    this.unlisten = this.history.listen(({ location }) => {
      if (!this.book || this.prevBook !== this.book) {
        const params = new URLSearchParams(location.search)
        this.book = params.get('book') || ''
        this.page = Number(params.get('page'))
        this.isbn = params.get('isbn')
        if (this.book) {
          Promise.resolve(this.rootStore.domainStore.getAllBooks(this.book, this.page)).then(() => {
            if (this.isbn) {
              const item = this.rootStore.domainStore.getItem(this.isbn)
              this.rootStore.uiStore.setViewContent(item)
              this.rootStore.uiStore.setViewPanelMode(true)
            } else {
              this.rootStore.uiStore.setHintsMode(true)
            }  
          })
        }
      } else if (this.page) {
        this.rootStore.domainStore.setCurrentPage(this.page)
        this.rootStore.domainStore.getAdditionalInfo()
      }
      this.prevBook = this.book
    })

    autorun(() => {
      this.history.replace(this.url.href)
    })
  }

  startSearch(searchedBook: string): void {
    this.book = searchedBook
    this.page = 1
  }

  getBooksOnPage(page: number): void {
    this.page = page
  }

  setISBN(isbn: string): void {
    this.isbn = isbn
  }

  deleteISBN(): void {
    this.isbn = null
  }

  get url(): URL {
    const url = new URL('http://localhost:3000')
    if (this.book) {
      url.searchParams.set('book', this.book)
      url.searchParams.set('page', this.page?.toString())
      if (this.isbn) {
        url.searchParams.set('isbn', this.isbn)
      }
    } else if (this.page) {
      const params = new URLSearchParams(this.history.location.search)
      url.searchParams.set('book', params.get('book'))
      url.searchParams.set('page', this.page?.toString())
      if (params.get('isbn')) {
        url.searchParams.set('isbn', this.isbn)
      }
    }
    return url
  }
}
