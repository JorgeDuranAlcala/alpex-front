import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled
} from '@mui/material';


import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

const NoBindersContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: 'lightblue',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '56px',
  padding: '16.5px 0px',
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  }
}))

interface BinderProps extends Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'> {
  binders: ReinsuranceCompanyBinderDto[]
}

export const Binder = ({ value, binders }: BinderProps) => {

  if (binders.length === 0) {
    return (
      <NoBindersContainer>
        No Binders
      </NoBindersContainer>
    )
  }


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
            {binder.referenceNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}


