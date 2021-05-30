import { FC } from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  background-color: ${({ theme: { colors } }) => colors.footerBg};
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
