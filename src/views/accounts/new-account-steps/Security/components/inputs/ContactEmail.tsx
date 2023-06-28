import {
  FormControl,
  TextField
} from '@mui/material';


import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

// ! only if we want specific props
// interface ContactEmailProps extends ISecurityInputProps {
//
// }

type ContactEmailProps = Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'>;

export const ContactEmail = ({ value }: ContactEmailProps) => {


  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <TextField
        autoFocus
        disabled
        fullWidth
        label='Contact email'
        size='small'
        value={value}
      />
    </FormControl>
  )
}


