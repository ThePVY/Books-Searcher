import { IWrapperF } from '@/types/common-types'
import { FC, useState } from 'react'
import styled from 'styled-components'

interface IPosition {
  position?: 'absolute' | 'relative'
  top?: string
  bottom?: string
  left?: string
  right?: string
  margin?: string
}

const StyledSwitcher = styled.div<IPosition>`
  width: 60px;
  height: 30px;
  border-radius: 50px;
  background-color: ${({ theme: { colors } }) => colors.appBg};
  position: ${(props) => props.position || 'absolute'};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  margin: ${(props) => props.margin};
  @media screen and (max-width: 320px) {
    width: 25px;
    height: 50px;
  }
`

const Slider = styled.div<{ mode: 'right' | 'left' }>`
  width: 50%;
  height: 100%;
  border-radius: 50px;
  background-color: ${({ theme: { colors } }) => colors.headerBg};
  border: 10px solid ${({ theme: { colors } }) => colors.contentBg};
  position: absolute;
  right: ${(props) => (props.mode === 'right' ? 0 : '50%')};
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 320px) {
    width: 100%;
    height: 50%;
    right: unset;
    bottom: ${(props) => (props.mode === 'right' ? 0 : '50%')};
  }
`

interface IProps extends IPosition {
  initialState: 'right' | 'left'
  handleRight?: IWrapperF
  handleLeft?: IWrapperF
}

const Switcher: FC<IProps> = ({
  initialState,
  handleRight,
  handleLeft,
  children,
  ...position
}) => {
  const [switchMode, setSwitchMode] = useState(initialState)
  const handleSwitch = () => {
    if (switchMode === 'right') {
      setSwitchMode('left')
      handleLeft()
    } else {
      setSwitchMode('right')
      handleRight()
    }
  }
  return (
    <StyledSwitcher {...position}>
      <Slider onClick={handleSwitch} mode={switchMode} />
    </StyledSwitcher>
  )
}

export default Switcher
