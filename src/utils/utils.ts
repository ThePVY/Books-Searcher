interface IObj {
  [key: string]: unknown
}

export function useSessionStorage<T extends IObj>(data: T = {} as T): void {
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
  observer: () => void

  constructor() {
    this.observer = null as () => void
    this.subscribe = this.subscribe.bind(this)
  }

  subscribe(fn: () => void): void {
    this.observer = fn
  }

}
