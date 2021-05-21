export type Exclude<T, U> = T extends U ? never : T

export type ItemTypeOf<P extends any[]> = P[number]

export type ActionT<T, P> = {
  type: T
  payload?: P
}

export type ResponseT<T> = {
  data: T
  resultCode?: ResultCodeT
  totalCount?: number
  error?: string | null
}

export type ResultCodeT = 1 | 0

export type ActionHandlerFT<S, P> = (state: S, payload: P) => S

export type WrapperFT<R = void> = () => R

export interface IWrapperF<R = void> {
  (): R
}

export interface IValidate {
  (value: string): string | undefined | string[]
}
