import { useCallback, useState } from 'react'

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}) {
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  )
  const isControlled = value !== undefined

  const currentValue = isControlled ? value : internalValue

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [currentValue, setValue] as const
}

export function useDefaultWhenFalsy<T>(defaultValue: T) {
  const [value, setValue] = useState<T | undefined>(undefined)
  return [value || defaultValue, setValue] as const
}
