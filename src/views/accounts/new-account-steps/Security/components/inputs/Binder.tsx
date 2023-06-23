import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';


import { BinderDto } from '@/services/catalogs/dtos/binder.dto';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

interface BinderProps extends Omit<ISecurityInputProps, 'index' | 'isError' | 'validateForm'> {
  binders: BinderDto[] | undefined
}

export const Binder = ({ value, binders }: BinderProps) => {


  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <InputLabel id='Binder'>Binder</InputLabel>
      <Select
        label='Binder'
        value={value.toString()}
        labelId='binder'
      >
        {binders?.map(binder => (
          <MenuItem key={binder.id} value={binder.id}>
            {binder.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}


