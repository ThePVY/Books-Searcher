import { DefaultTheme } from "styled-components"

export const mainTheme: DefaultTheme = {
  colors: {
    appBg: '#ececec',
    appFg: '#4e4e4e',
    contentBg: '#ffffff',
    contentFg: '#4e4e4e',
    footerBg: '#dddddd',
    headerBg: '#dddddd',
    shadowBg: `rgba(0, 0, 0, 0.5)`,
    hintBg: '#ffffff',
    hintHoverBg: `#ececec`
  }
}

export const darkTheme: DefaultTheme = {
  colors: {
    appBg: '#2b2b2b',
    appFg: '#acacac',
    contentBg: '#000000',
    contentFg: '#acacac',
    footerBg: '#1b1b1b',
    headerBg: '#1b1b1b',
    shadowBg: `rgba(30, 30, 30, 0.7)`,
    hintBg: '#4e4e4e',
    hintHoverBg: '#1b1b1b'
  }
}