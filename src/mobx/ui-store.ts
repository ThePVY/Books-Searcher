import { darkTheme, mainTheme } from '@/themes'
import { cookieCtrl } from '@/utils/ThemeCookie'
import { makeAutoObservable } from 'mobx'

export type ThemeT = 'main' | 'dark'

export class UIStore {
  currentTheme = cookieCtrl.getInialTheme()

  constructor () {
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
}

export default new UIStore()
