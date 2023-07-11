import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';


import { useAppSelector } from '@/store';
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface';

// interface ContactCountryProps extends Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'> {
//   countries: CountryDto[] | undefined
// }

type ContactCountryProps = Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'>
export const ContactCountry = ({ value }: ContactCountryProps) => {

  const { getDatas: { countries } } = useAppSelector(state => state.securitySlice)


  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id='Contactcountry'>Contact country</InputLabel>
      <Select
        id='outlined-Name'
        label='Contact country'
        value={value.toString()}
        labelId='Contactcountry'
        size='small'
        disabled
      >
        {countries?.map(country => (
          <MenuItem key={country.name} value={country.id}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}


