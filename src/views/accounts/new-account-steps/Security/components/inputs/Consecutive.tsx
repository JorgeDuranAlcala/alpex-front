import { FormControl, TextField } from '@mui/material'

import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

// ! only if we want specific props
// interface ConsecutiveProps extends ISecurityInputProps {
//
// }

type ConsecutiveProps = Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'>

export const Consecutive = ({ value, view }: ConsecutiveProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <TextField autoFocus disabled={true || view === 2} fullWidth label='Consecutive' value={value} />
    </FormControl>
  )
}
