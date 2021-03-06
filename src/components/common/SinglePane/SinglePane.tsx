import { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ fixedHeight: boolean }>`
  min-height: 86vh;
  display: grid;
  grid-template-columns: 1fr minmax(900px, 8fr) 1fr;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 700px 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 500px 1fr;
  }
  @media screen and (max-width: 568px) {
    grid-template-columns: 0fr minmax(300px, 1fr) 0fr;
  }
  @media screen and (max-width: 320px) {
    grid-template-columns: 0fr minmax(250px, 1fr) 0fr;
  }

  height: ${(props) => (props.fixedHeight ? '86vh' : 'fit-content')};
`

const ContentArea = styled.div`
  background-color: ${({ theme: { colors } }) => colors.contentBg};
  width: 100%;
  height: 100%;
`

interface ISinglePaneProps {
  fixedHeight?: boolean
}

const SinglePane: FC<ISinglePaneProps> = ({ children, fixedHeight = false }) => {
  return (
    <Wrapper fixedHeight={fixedHeight}>
      <div />
      <ContentArea>{children}</ContentArea>
      <div />
    </Wrapper>
  )
}

export default SinglePane
