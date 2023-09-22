import { SxProps, TextField } from '@mui/material'

interface DisabledTextFieldProps {
  label: string
  value: string | number
  sx?: SxProps
}

export const DisabledTextField = ({ label, value, sx }: DisabledTextFieldProps) => {
  return <TextField disabled fullWidth label={label} value={value} sx={sx} />
}
