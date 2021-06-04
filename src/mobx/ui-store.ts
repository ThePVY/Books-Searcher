import { darkTheme, mainTheme } from '@/themes'
import { cookieCtrl } from '@/utils/ThemeCookie'
import { makeAutoObservable } from 'mobx'
import EditionInfo from './edition-info'
import { RootStore } from './store'

export type ThemeT = 'main' | 'dark'

export default class UIStore {
  rootStore: RootStore
  currentTheme = cookieCtrl.getInialTheme()
  hintsMode = false
  viewPanelMode = false
  viewContent: EditionInfo
  imageLoading = false

  constructor (rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setTheme (theme: ThemeT): void {
    if (theme === 'main') {
      this.currentTheme = mainTheme
    } else if (theme === 'dark') {
      this.currentTheme = darkTheme
    }
    cookieCtrl.setTheme(theme)
  }

  setHintsMode (value: boolean): void {
    this.hintsMode = value
  }

  setViewPanelMode (value: boolean): void {
    this.viewPanelMode = value
  }

  setViewContent (value: EditionInfo): void {
    this.viewContent = value
    this.imageLoading = true
  }

  setImageLoading (value: boolean): void {
    this.imageLoading = value
  }
}
