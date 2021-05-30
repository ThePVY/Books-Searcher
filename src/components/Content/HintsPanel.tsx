import { FC } from 'react'
import styled from 'styled-components'

const HintsWrapper = styled.div<{ isShown: boolean }>`
  display: ${(props) => (props.isShown ? 'block' : 'none')};
  width: 100%;
  height: fit-content;
  min-width: 250px;
  margin: 1rem auto;
  position: absolute;
  top: 1.5rem;
  left: 0;

  max-height: 50vh;
  background-color: ${({ theme: { colors } }) => colors.hintBg};
  padding: 0.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

const HintContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  margin: 0.2rem 0;
  /* border: 1px solid grey;
  border-radius: 5px; */
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.hintHoverBg};
  }
  cursor: pointer;

  @media screen and (max-width: 568px) {
    height: 3.5rem;
    text-align: center;
  }
`

export const hintClassName = 'hint-panel__hint-class'

const Hint = styled.div.attrs({ className: hintClassName })`
  width: fit-content;
  height: fit-content;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

interface IHintsPanelProps {
  hints: string[]
  isShown: boolean
  onHintClick: (hint: string) => void
}

const HintsPanel: FC<IHintsPanelProps> = ({ hints, isShown = false, onHintClick }) => {
  return (
    <HintsWrapper isShown={hints.length !== 0 && isShown}>
      {hints.map((hint) => (
        <div key={hint}>
          <HintContainer onClick={() => onHintClick(hint)}>
            <Hint>{hint}</Hint>
          </HintContainer>
          <hr />
        </div>
      ))}
    </HintsWrapper>
  )
}

export default HintsPanel
