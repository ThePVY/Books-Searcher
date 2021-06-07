import Footer from './components/Footer/Footer'
import Content from './components/Content/Content'
import styled from 'styled-components'
import Header from './components/Header/Header'
import { FC, ReactEventHandler, useContext } from 'react'
import { hintClassName } from './components/Content/HintsPanel'
import { searchInputClass } from './components/Content/SearchForm'
import { AppContext } from '.'
import { cookieCtrl } from './utils/ThemeCookie'

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.appBg};
  min-height: 100%;
  min-width: 250px;
  display: grid;
  grid-template-rows: 6vh 1fr 6vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header'
    'content'
    'footer';

  @media screen and (max-width: 568px) {
    grid-template-rows: 10vh 1fr 10vh;
  }
`

const App: FC = () => {
  console.log('App rendered')
  const uiStore = useContext(AppContext).uiStore
  const handleClick: ReactEventHandler<HTMLDivElement> = (e) => {
    const { classList } = e.target as HTMLDivElement
    if (!classList.contains(hintClassName) && !classList.contains(searchInputClass)) {
      uiStore.setHintsMode(false)
    }
  }
  return (
    <AppWrapper onClick={handleClick}>
      <Header />
      <Content />
      <Footer />
    </AppWrapper>
  )
}

export default App
