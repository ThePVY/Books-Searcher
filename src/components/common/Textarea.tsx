import { IInputRF } from '@/types/form-types'
import styled from 'styled-components'

interface ITextareaProps extends IInputRF {
  type: string
  placeholder: string
  disabled: boolean
  color: string
}

type StyledTextareaT = Readonly<Partial<ITextareaProps>>

const Textarea = styled.textarea<StyledTextareaT>`
  min-width: fit-content;
  width: 100%;
  background-color: rgb(252, 252, 252);
  color: ${({ color }) => color || 'rgb(118, 124, 124)'};
  border: 1px solid rgb(125, 125, 128);
  border-radius: 5px;

  font-size: 14px;
  padding: 0.5em 0.5em;
  line-height: 1.5em;
  outline: none;
  resize: none;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

export default Textarea
