import { FC } from 'react'
import styled from 'styled-components'
import Div from '../common/Div'

const FooterWrapper = styled(Div)`
  background-color: rgb(245, 245, 245);
  grid-area: footer;
  text-align: center;
  height: 6vh;
  div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <div>FOR PORTFOLIO</div>
    </FooterWrapper>
  )
}

export default Footer
