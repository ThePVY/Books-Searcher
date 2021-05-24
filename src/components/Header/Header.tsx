import { FC } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'

const Wrapper = styled.div`
  background-color: rgb(245, 245, 245);
  grid-area: header;
  height: 6vh;
  div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`


const Header: FC = () => {
  return (
    <Wrapper>
      <Div width='fit-content' height='fit-content'>
        SEARCH BOOKS WITH EASE
      </Div>
    </Wrapper>
  )
}

export default Header
