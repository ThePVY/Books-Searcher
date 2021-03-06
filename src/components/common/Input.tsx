import styled, { css } from 'styled-components'

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
  'week'
}

interface IInputProps {
  type: keyof typeof InputType
  placeholder: string
  disabled: boolean
  color: string
  width: string
}

type InputTypeT = Readonly<Partial<IInputProps>>

const Input = styled.input<InputTypeT>`
  min-width: fit-content;
  &:not(input[type='checkbox']) {
    width: ${(props) => props.width || '100%'};
  }
  ${({ theme: { colors } }) =>
    css`
      background-color: ${colors.appBg};
      color: ${colors.appFg};
      border: 1px solid ${colors.appBg};
    `};
  border-radius: 5px;

  font-size: 14px;
  padding: 0.3em 0.5em;
  line-height: 1.5em;
  outline: none;
  resize: none;
`

export default Input
