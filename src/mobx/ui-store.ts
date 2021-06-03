import { darkTheme, mainTheme } from '@/themes'
import { cookieCtrl } from '@/utils/ThemeCookie'
import { makeAutoObservable } from 'mobx'
import EditionInfo from './edition-info'
import { RootStore } from './store'

export type ThemeT = 'main' | 'dark'

export default class UIStore {
  rootStore: RootStore
  currentTheme = cookieCtrl.getInialTheme()
  _hintsMode = false
  _viewPanelMode = false
  _viewContent: EditionInfo
  _imageLoading = false

  constructor (rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  setTheme (theme: ThemeT): void {
    if (theme === 'main') {
      this.currentTheme = mainTheme
    } else if (theme === 'dark') {
      this.currentTheme = darkTheme
    }
    cookieCtrl.setTheme(theme)
  }

  set hintsMode (value: boolean) {
    this._hintsMode = value
  }
  get hintsMode (): boolean {
    return this._hintsMode
  }

  set viewPanelMode (value: boolean) {
    this._viewPanelMode = value
  }
  get viewPanelMode (): boolean {
    return this._viewPanelMode
  }

  set viewContent (value: EditionInfo) {
    this._viewContent = value
  }
  get viewContent (): EditionInfo {
    return this._viewContent
  }

  set imageLoading (value: boolean) {
    this._imageLoading = value
  }
  get imageLoading (): boolean {
    return this._imageLoading
  }
}
