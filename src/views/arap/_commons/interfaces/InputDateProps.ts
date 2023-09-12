import { SyntheticEvent } from 'react'

export interface InputDateProps {
  value: string | number | Date
  isDisabled?: boolean
  onChange: (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => void
}
