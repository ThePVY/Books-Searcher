import { FC, MouseEventHandler } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Div from '../Div'
import FlexContainer from '../FlexContainer'

const ShadowDiv = styled(Div)<{ isShown: boolean }>`
  ${(props) =>
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
const NullContainer = styled.div<{ hide: boolean }>`
  ${(props) =>
    props.hide &&
    css`
      width: 0;
      height: 0;
      z-index: 10;
      margin: 0 auto;
    `}
`

const ViewArea = styled(Div)<{ fixed: boolean }>`
  height: 50vh;
  width: 50vw;
  z-index: 10;
  ${(props) =>
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
`

const hoistAnimation = keyframes`
    0% { transform: scale3d(.5, .5, .5); }
    100% { transform: scale3d(1,1,1); }
`

const ContentArea = styled(FlexContainer)`
  background-color: white;
  min-height: max-content;
  position: absolute;
  top: 0;
  z-index: 10;
  img {
    max-width: 40vw;
    max-height: 40vh;
  }
  animation: ${hoistAnimation} 0.5s 1;
  animation-delay: 0.5;
`

const LeafContainer = styled(Div)`
  width: 5vw;
  background-color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
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
      <NullContainer hide={!fixed}>
        <ViewArea fixed={fixed}>
          <ContentArea jstfCnt="space-between" algnItems="center">
            {multiple && <LeafContainer onClick={onPrev} />}
            <Div>{content}</Div>
            {multiple && <LeafContainer onClick={onNext} />}
          </ContentArea>
        </ViewArea>
      </NullContainer>
    </>
  )
}

export default ViewPanel
