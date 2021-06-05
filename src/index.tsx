import { hot } from 'react-hot-loader/root'
import { createContext, FC } from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {} from 'styled-components/cssprop'
import App from './App'
import rootStore from './mobx/store'
import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'

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

export const AppContext = createContext(rootStore)

const RootContainer: FC = observer(() => (
  <BrowserRouter>
    <AppContext.Provider value={rootStore}>
      <ThemeProvider theme={rootStore.uiStore.currentTheme}>
        <App />
        <GlobalStyles />
      </ThemeProvider>
    </AppContext.Provider>
  </BrowserRouter>
))

const render = (Component: FC) => {
  const HotWrapper = hot(Component)
  ReactDOM.render(<HotWrapper />, document.getElementById('root'))
}

render(RootContainer)
