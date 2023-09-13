import { SxProps } from '@mui/material'
import { SyntheticEvent } from 'react'

export interface InputDateProps {
  value: string | number | Date
  isDisabled?: boolean
  sx?: SxProps
  onChange: (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => void
}
