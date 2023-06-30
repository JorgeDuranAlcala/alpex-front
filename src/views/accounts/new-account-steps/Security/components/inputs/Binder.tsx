import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';


import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto';
import { useEffect, useState } from 'react';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

// const NoBindersContainer = styled(Box)(({ theme }) => ({
//   // backgroundColor: 'lightblue',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '56px',
//   padding: '16.5px 0px',
//   marginBottom: '24px',
//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   }
// }))

interface BinderProps extends Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'> {
  binders: ReinsuranceCompanyBinderDto[]
}

export const Binder = ({ value, binders }: BinderProps) => {

  const [selectedBinder, setSelectedBinder] = useState<ReinsuranceCompanyBinderDto | null>(null)

  // if (binders.length === 0) {
  //   return (
  //     <NoBindersContainer>
  //       No Binders
  //     </NoBindersContainer>
  //   )
  // }

  const handleOnChangeBinder = (value: number) => {
    setSelectedBinder(binders.filter(b => b.id === value)[0])
  }

  useEffect(() => {
    setSelectedBinder(null)
  }, [binders])



  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <InputLabel id='Binder'>Binder</InputLabel>
      <Select
        label='Binder'
        value={selectedBinder && binders.length > 0 ? selectedBinder.id : value.toString()}
        labelId='binder'
        disabled={binders.length === 0}
        onChange={(e) => handleOnChangeBinder(Number(e.target.value))}
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


