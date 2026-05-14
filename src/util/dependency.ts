import { createContext, useContext } from 'react'

export function createDependency<T>(name: string) {
  const Context = createContext<T | undefined>(undefined)
  Context.displayName = name // shows in React DevTools

  const useDependency = (): T => {
    const value = useContext(Context)
    if (value === undefined) {
      throw new Error(`Missing dependency: ${name}`)
    }
    return value
  }

  return { Context, useDependency }
}
