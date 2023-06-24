import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';


import { CountryDto } from '@/services/catalogs/dtos/country.dto';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

interface ContactCountryProps extends Omit<ISecurityInputProps, 'index' | 'isError' | 'validateForm'> {
  countries: CountryDto[] | undefined
}

export const ContactCountry = ({ value, countries }: ContactCountryProps) => {


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


