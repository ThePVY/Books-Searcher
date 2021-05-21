import { Dispatch } from 'redux'
import { UserContactsDT, UserPhotosDT } from './api-types'

export type LoginFormDT = {
  login: string
  password: string
  rememberMe: boolean
}

export type StatusFormDT = { status: string }

export type PostFormDT = { post: string }

export type ProfileInfoFormDT = {
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  contacts: UserContactsDT
}

export type AvaFormDT = { photo: UserPhotosDT }

export interface IInputRF<T = string> {
  checked: boolean
  name: string
  value: T
  onBlur: (...args: unknown[]) => unknown
  onChange: (...args: unknown[]) => unknown
  onDragStart: (...args: unknown[]) => unknown
  onDrop: (...args: unknown[]) => unknown
  onFocus: (...args: unknown[]) => unknown
}

export interface IMetaRF {
  active: boolean
  autofilled: boolean
  asyncValidating: boolean
  dirty: boolean
  dispatch: Dispatch
  error: string
  form: string
  initial: unknown
  invalid: boolean
  pristine: boolean
  submitting: boolean
  submitFailed: boolean
  touched: boolean
  valid: boolean
  visited: boolean
  warning: string
}

