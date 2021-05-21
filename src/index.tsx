import { hot } from 'react-hot-loader/root'
import { FC } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import {} from 'styled-components/cssprop'
import store from './redux/store-redux'
import App from './App'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        color: rgb(122, 134, 134);
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

const RootContainer = () => (
  <HashRouter hashType="slash">
    <Provider store={store}>
      <App />
      <GlobalStyles />
    </Provider>
  </HashRouter>
)

const render = (Component: FC) => {
  const HotWrapper = hot(Component)
  ReactDOM.render(<HotWrapper />, document.getElementById('root'))
}

render(RootContainer)
