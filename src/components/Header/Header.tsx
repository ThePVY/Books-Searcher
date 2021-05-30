import selector from '@/redux/selectors'
import { AppDispatchT, RootStateT } from '@/redux/store-redux'
import { actionCreator } from '@/redux/theme-reducer'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

const Header: FC = () => {
  const setMainThemeSC = useSelector((state: RootStateT) =>
    selector.subscribeControllers.setMainTheme(state)
  )
  const setDarkThemeSC = useSelector((state: RootStateT) =>
    selector.subscribeControllers.setDarkTheme(state)
  )
  const dispatch: AppDispatchT = useDispatch()
  const applyDarkTheme = () => {
    dispatch(actionCreator.setCurrentTheme('dark'))
  }
  const applyMainTheme = () => {
    dispatch(actionCreator.setCurrentTheme('main'))
  }
  useEffect(() => {
    setMainThemeSC.subscribe(applyMainTheme)
    setDarkThemeSC.subscribe(applyDarkTheme)
    return () => {
      setMainThemeSC.unsubscribe(applyMainTheme)
      setDarkThemeSC.unsubscribe(applyDarkTheme)
    }
  })
  return (
    <Wrapper>
      <ThemeSwitcher initialState="left" leftSC={setMainThemeSC} rightSC={setDarkThemeSC} />
      <Title>SEARCH BOOKS WITH EASE</Title>
    </Wrapper>
  )
}

export default Header
