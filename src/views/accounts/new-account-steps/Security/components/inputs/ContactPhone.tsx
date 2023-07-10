import { FormControl, TextField } from '@mui/material'

import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

// ! only if we want specific props
// interface ContactPhoneProps extends ISecurityInputProps {
//
// }

type ContactPhoneProps = Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'>

export const ContactPhone = ({ value, view }: ContactPhoneProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <TextField autoFocus fullWidth disabled={true || view === 2} size='small' label='Contact phone' value={value} />
    </FormControl>
  )
}
