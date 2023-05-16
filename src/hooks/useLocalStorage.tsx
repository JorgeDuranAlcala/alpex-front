import { useEffect, useState } from 'react'

export function useLocalStorage(key: string, isJSON: boolean) {
  const [value, setValue] = useState<any>()

  useEffect(() => {
    const stored = localStorage.getItem(key)
    console.log(`Stored "${key}": ${stored}`)
    if (stored) {
      if (isJSON) {
        setValue(JSON.parse(stored))
      } else {
        setValue(stored)
      }
    }
  }, [key, isJSON])

  return [value, setValue] as const
}
