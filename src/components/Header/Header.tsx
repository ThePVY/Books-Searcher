import { AppContext } from '@/index'
import { cookieCtrl } from '@/utils/ThemeCookie'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import styled from 'styled-components'
import Switcher from '../common/Switcher'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.headerBg};
  grid-area: header;
  height: 6vh;
  position: relative;
  z-index: 0;
  @media screen and (max-width: 568px) {
    height: 10vh;
  }
`

const Title = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 568px) {
    text-align: center;
    width: 200px;
  }
`

const ThemeSwitcher = styled(Switcher)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto 0px;
  right: 3vw;
  z-index: 1;
`

const initialState = cookieCtrl.getSwitcherInitialState()

const Header: FC = observer(() => {
  const store = useContext(AppContext)
  const applyDarkTheme = () => {
    store.uiStore.setTheme('dark')
  }
  const applyMainTheme = () => {
    store.uiStore.setTheme('main')
  }
  return (
    <Wrapper>
      <ThemeSwitcher
        initialState={initialState}
        handleLeft={applyMainTheme}
        handleRight={applyDarkTheme}
      />
      <Title>SEARCH BOOKS WITH EASE</Title>
    </Wrapper>
  )
})

export default Header
