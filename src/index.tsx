import { hot } from 'react-hot-loader/root'
import { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {} from 'styled-components/cssprop'
import store, { RootStateT } from './redux/store-redux'
import App from './App'
import { darkTheme, mainTheme } from './themes'
import selector from './redux/selectors'
import { cookieCtrl } from './utils/ThemeCookie'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: ${(props) => props.theme.colors.appFg};
    }
    html,
    body,
    #root {
        height: 100vh;
    }
    a {
      color: rgb(122, 134, 134);
      text-decoration: none;
    }
    a.active {
      color: rgb(148, 160, 160);
    }
`

const initialTheme = cookieCtrl.getInialTheme()

const DarkThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme)
  const setDarkTheme = () => setTheme(darkTheme)
  const setMainTheme = () => setTheme(mainTheme)
  const setMainThemeSC = useSelector((state: RootStateT) =>
    selector.subscribeControllers.setMainTheme(state)
  )
  const setDarkThemeSC = useSelector((state: RootStateT) =>
    selector.subscribeControllers.setDarkTheme(state)
  )
  useEffect(() => {
    setMainThemeSC.subscribe(setMainTheme)
    setDarkThemeSC.subscribe(setDarkTheme)
    return () => {
      setMainThemeSC.unsubscribe(setMainTheme)
      setDarkThemeSC.unsubscribe(setDarkTheme)
    }
  }, [])
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const RootContainer = () => (
  <Provider store={store}>
    <DarkThemeProvider>
      <App />
      <GlobalStyles />
    </DarkThemeProvider>
  </Provider>
)

const render = (Component: FC) => {
  const HotWrapper = hot(Component)
  ReactDOM.render(<HotWrapper />, document.getElementById('root'))
}

render(RootContainer)
