import 'styled-components'

interface IColorsSet {
  appBg: string
  appFg: string
  contentBg: string
  contentFg: string
  footerBg: string
  headerBg: string
  shadowBg: string
  hintBg: string
  hintHoverBg: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    id: 'main' | 'dark'
    colors: IColorsSet
  }
}