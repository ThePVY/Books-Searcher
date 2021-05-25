import { FC, MouseEventHandler } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Div from '../Div'
import FlexContainer from '../FlexContainer'

const ShadowDiv = styled.div<{ isShown: boolean }>`
  ${props =>
    props.isShown &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
    `}
`

/*
    NullContainer нужен для того, чтобы ...FlexContainer можно было позиционировать relative
    при этом не влияя на элементы, окружающие ViewPanel
*/
const NullContainer = styled.div<{ hide: boolean; isShown: boolean }>`
  ${props =>
    props.hide &&
    css`
      width: 0;
      height: 0;
      z-index: 10;
      margin: 0 auto;
    `}
  display: ${props => (props.isShown ? 'block' : 'none')};
`

const ViewArea = styled.div<{ fixed: boolean }>`
  width: 900px;
  height: 700px;
  z-index: 10;
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        `
      : css`
          position: relative;
          left: 0;
          top: 0;
          transform: translate(-50%, 40%);
        `}
  @media screen and (max-width: 1024px) {
    width: 700px;
    height: 700px;
  }
  @media screen and (max-width: 768px) {
    width: 500px;
    height: 650px;
  }
  @media screen and (max-width: 568px) {
    width: 320px;
    max-width: 100vw;
    height: 710px;
  }
  @media screen and (max-width: 320px) {
    width: 250px;
    height: 500px;
  }
`

const hoistAnimation = keyframes`
  from { 
    transform: scale3d(.5, .5, .5);
  }
  to { 
    transform: scale3d(1,1,1);
  }
`

const ContentArea = styled(FlexContainer)`
  background-color: white;
  border-radius: 20px;
  min-height: max-content;
  position: absolute;
  top: 0;
  z-index: 10;
  animation: ${hoistAnimation} 0.5s 1;
  animation-delay: 0.5;
`

const LeftLeafContainer = styled(Div)`
  width: 5vw;
  min-width: 2.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 568px) {
    background-color: rgba(0, 0, 0, 0);
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
    position: absolute;
    top: 0;
    left: 0;
  }
`
const RightLeafContainer = styled(Div)`
  width: 5vw;
  min-width: 2.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 568px) {
    background-color: rgba(0, 0, 0, 0);
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
    position: absolute;
    top: 0;
    right: 0;
  }
`

interface IViewPanelProps {
  isShown: boolean
  content: JSX.Element
  multiple?: boolean
  fixed?: boolean
  onNext?: MouseEventHandler<HTMLDivElement>
  onPrev?: MouseEventHandler<HTMLDivElement>
  onClose: MouseEventHandler<HTMLDivElement>
}

const ViewPanel: FC<IViewPanelProps> = ({
  isShown,
  content,
  multiple = false,
  onNext,
  onPrev,
  onClose,
  fixed = false
}) => {
  return (
    <>
      <ShadowDiv onClick={onClose} isShown={isShown} />
      <NullContainer hide={!fixed} isShown={isShown}>
        <ViewArea fixed={fixed}>
          <ContentArea jstfCnt='space-between' algnItems='center'>
            {multiple && <LeftLeafContainer onClick={onPrev} />}
            <Div>{content}</Div>
            {multiple && <RightLeafContainer onClick={onNext} />}
          </ContentArea>
        </ViewArea>
      </NullContainer>
    </>
  )
}

export default ViewPanel
