import { IInputRF } from '@/types/form-types'
import styled from 'styled-components'

export enum InputType {
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
}

interface IInputProps extends IInputRF {
  type: keyof typeof InputType
  placeholder: string
  disabled: boolean
  color: string
}

type InputTypeT = Readonly<Partial<IInputProps>>

const Input = styled.input<InputTypeT>`
  min-width: fit-content;
  &:not(input[type='checkbox']) {
    width: 100%;
  }
  background-color: rgb(252, 252, 252);
  color: ${({ color }) => color || 'rgb(118, 124, 124)'};
  border: 1px solid rgb(125, 125, 128);
  border-radius: 5px;

  font-size: 14px;
  padding: 0.3em 0.5em;
  line-height: 1.5em;
  outline: none;
  resize: none;
`

export default Input
