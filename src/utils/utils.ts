import { WrapperFT } from "@/types/common-types"

interface IObj<T = any> {
  [key: string]: T
}

export function addToSessionStorage<T extends IObj>(data: T = {} as T): void {
  Object.keys(data).forEach((key) => sessionStorage.setItem(key, JSON.stringify(data[key])))
}

export const checkAndParse = (str: string): unknown => {
  const item = sessionStorage.getItem(str)
  return item ? JSON.parse(item) : undefined
}

export function throttle(fn: () => void, ms: number): ReturnType<typeof setTimeout> {
  return setTimeout(() => fn(), ms)
}


export class Subscriber {
  observers: Map<string, WrapperFT>

  constructor() {
    this.observers = new Map<string, WrapperFT>()
    this.subscribe = this.subscribe.bind(this)
  }

  subscribe(fn: WrapperFT): void {
    this.observers.set(fn.name, fn)
  }

  unsubscribe(fn: WrapperFT): 1 | 0 {
    if (this.observers.has(fn.name)) {
      this.observers.delete(fn.name)
      return 0
    }
    return 1
  }

  callObservers(): void {
    this.observers.forEach((observer) => observer())
  }

}
