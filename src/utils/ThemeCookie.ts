import { ThemeT } from '@/mobx/ui-store'
import { darkTheme, mainTheme } from '@/themes'
import { DefaultTheme } from 'styled-components'

class ThemeCookie {
  constructor() {
    this.getTheme = this.getTheme.bind(this)
    this.setTheme = this.setTheme.bind(this)
    this.deleteThemes = this.deleteThemes.bind(this)
    this.getInialTheme = this.getInialTheme.bind(this)
  }

  getTheme(): string {
    const cookies = document.cookie.split(';')
    let currentTheme = ''
    cookies.forEach((cookie) => {
      const arr = cookie.split('=')
      if (arr[0] === 'currentTheme') {
        currentTheme = arr[1]
      }
    })
    return currentTheme
  }

  setTheme(theme: ThemeT) {
    document.cookie = `currentTheme=${theme}; max-age=2592e3; SameSite=strict`
  }

  deleteThemes() {
    document.cookie = `currentTheme=main; max-age=0`
    document.cookie = `currentTheme=dark; max-age=0`
  }

  getInialTheme(): DefaultTheme {
    const cookieTheme = this.getTheme()
    let initialTheme = null as DefaultTheme
    if (cookieTheme) {
      if (cookieTheme === 'main') {
        initialTheme = mainTheme
      } else if (cookieTheme === 'dark') {
        initialTheme = darkTheme
      }
    }
    return initialTheme || mainTheme
  }

  getSwitcherInitialState(): 'left' | 'right' {
    const initialTheme = this.getTheme()
    if (initialTheme === 'main') {
      return 'left'
    }
    if (initialTheme === 'dark') {
      return 'right'
    }
    return null as 'left' | 'right'
  }
}

export const cookieCtrl = new ThemeCookie()
