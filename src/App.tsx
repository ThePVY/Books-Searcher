import Footer from './components/Footer/Footer'
import Content from './components/Content/Content'
import styled from 'styled-components'
import Header from './components/Header/Header'
import { FC, ReactEventHandler } from 'react'
import { hintClassName } from './components/Content/HintsPanel'
import { searchInputClass } from './components/Content/SearchForm'
import { useSelector } from 'react-redux'
import { RootStateT } from './redux/store-redux'
import selector from './redux/selectors'

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
  const hintSubscriber = useSelector((state: RootStateT) =>
    selector.subscribeControllers.onHintClick(state)
  )
  const handleClick: ReactEventHandler<HTMLDivElement> = (e) => {
    const { classList } = e.target as HTMLDivElement
    if (!classList.contains(hintClassName) && !classList.contains(searchInputClass)) {
      hintSubscriber.callObservers()
    }
  }
  return (
    <AppWrapper onClick={handleClick}>
      <Header />
      <Content subscribeHint={hintSubscriber.subscribe} />
      <Footer />
    </AppWrapper>
  )
}

export default App
