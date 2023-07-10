import {
  FormControl,
  TextField
} from '@mui/material';


import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface';

// ! only if we want specific props
// interface ConsecutiveProps extends ISecurityInputProps {
//
// }

type ConsecutiveProps = Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'>;

export const Consecutive = ({ value }: ConsecutiveProps) => {


  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <TextField
        autoFocus
        disabled
        fullWidth
        label='Consecutive'
        value={value}
      />
    </FormControl>
  )
}


