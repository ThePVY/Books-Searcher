import { FC, useEffect } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import Div from '../Div'
import Input from '../Input'
import Textarea from '../Textarea'
import { ICreateFieldInput, IFieldTemplateProps, IInputProps, ITextareaProps } from './CustomFieldsTs'

const StyledSpan = styled.span`
  padding: 0px 1rem;
`

export const createField = ({ text = '', ...other }: ICreateFieldInput): JSX.Element => {
  return (
    <Div height='fit-content'>
      <Field {...other} />
      {text && <StyledSpan>{text}</StyledSpan>}
    </Div>
  )
}

const ErrorSpan = styled.span<{ error?: boolean }>`
  color: ${props => (props.error ? 'rgb(95, 29, 29)' : 'inherit')};
`

export const FieldTemplate: FC<IFieldTemplateProps> = ({
  input,
  meta,
  notified = false,
  children,
  isValid = () => {},
  isChecked = () => {},
}) => {
  let notification
  if (meta.touched && notified) {
    notification = meta.error || ''
  }

  const { valid } = meta
  useEffect(() => isValid(valid), [valid, isValid])
  const { checked } = input
  useEffect(() => isChecked(checked), [checked, isChecked])

  return (
    <>
      {children}
      <ErrorSpan error>{notification}</ErrorSpan>
    </>
  )
}

export const TextareaTemplate: FC<ITextareaProps> = ({ type, placeholder, disabled, input, ...other }) => {
  return (
    <FieldTemplate {...other} input={input} notified>
      <Textarea type={type} placeholder={placeholder} disabled={disabled} {...input} />
    </FieldTemplate>
  )
}

export const InputTemplate: FC<IInputProps> = ({ type, placeholder, disabled, input, ...other }) => {
  return (
    <FieldTemplate {...other} input={input} notified>
      <Input type={type} placeholder={placeholder} disabled={disabled} {...input} />
    </FieldTemplate>
  )
}
