import {
  AddressContainer,
  ButtonContainer,
  FormContainer,
  MapContainer
} from '@/styled-components/accounts/Security.styled';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'; //SelectChangeEvent

import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import Icon from 'src/@core/components/icon';
import { useGetAllCountries as useCountryGetAll } from 'src/hooks/catalogs/country';

export interface AddressInfo {
  addressLine1: string
  addressLine2: string
  country: number | string
  city: number | string
  state: number | string
  zipCode: string
}

interface AddressInfoErrors {
  addressLine1Error: boolean
  addressLine2Error: boolean
  countryError:  boolean
  cityError:  boolean
  stateError:  boolean
  zipCodeError: boolean
}

const ColorButton = styled(Button)<ButtonProps>(({ }) => ({
  color: '#64C623',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#64C623'
  }
}))

const FormAddress = () => {

  const { countries } = useCountryGetAll()
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',

  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<AddressInfoErrors>({
    addressLine1Error: false,
    addressLine2Error: false,
    countryError: false,
    cityError: false,
    stateError: false,
    zipCodeError: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressInfo({ ...addressInfo, [name]: value })

    // !validateForm && validations({ ...addressInfo, [name]: value })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const target = event.target
    const name = target.name
    const value = target.value

    let addressInfoTem = { ...addressInfo }



    addressInfoTem = {
      ...addressInfoTem,
      [name]: value
    }

    // !validateForm && validations(addressInfoTem)
    setAddressInfo(addressInfoTem)
  }

  const getErrorMessage = (name: keyof AddressInfoErrors) => {
    const errorMsj = 'This field is required'

    return errors[name] ? errorMsj : ''
  }

  return (
    <AddressContainer>
      <h1 className='title'>Address</h1>
      <FormContainer>
        <div className='containerInputs'>
          {' '}
          <TextField
            sx={{ width: '100%' }}
            value={addressInfo.addressLine1}
            id='outlined-password-input'
            label='Address Line 1'
            autoComplete='current-password'
          />
          <TextField
            sx={{ width: '100%' }}
            value={addressInfo.addressLine2}
            id='outlined-password-input'
            label='Address Line 2'
            autoComplete='current-password'
          />
        </div>
        <div className='containerInputs'>
        <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.countryError}>
            <InputLabel>Country</InputLabel>

            <Select
              name='country'
              label='Country'
              defaultValue={''}
              value={String(addressInfo.country)}
              onChange={handleSelectChange}
              labelId='invoice-country'
            >
              {countries.length > 0 ? (
                countries.map(country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>

            {errors.countryError && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                {getErrorMessage('countryError')}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
          sx={{ width: '100%' }}
          value={addressInfo.zipCode}
          name='zip-code'
          id='outlined-password-input'
          label='Zip code'
          onChange={handleInputChange}
          error={!!errors.zipCodeError}
          helperText={getErrorMessage('zipCodeError')}
          />

        </div>
        <div className='containerInputs'>
          {' '}
         <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.countryError}>
            <InputLabel>City</InputLabel>

            <Select
              name='city'
              label='City'
              defaultValue={''}
              value={String(addressInfo.city)}
              onChange={handleSelectChange}
              labelId='city'
            >
              {countries.length > 0 ? (
                countries.map(country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>

            {errors.countryError && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                {getErrorMessage('countryError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }} error={errors.countryError}>
            <InputLabel>State / Province</InputLabel>

            <Select
              name='state'
              label='State / Province'
              defaultValue={''}
              value={String(addressInfo.state)}
              onChange={handleSelectChange}
              labelId='city'
            >
              {countries.length > 0 ? (
                countries.map(country => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>

            {errors.countryError && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                {getErrorMessage('countryError')}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </FormContainer>
      <h1 className='title' style={{ marginTop: '40px', marginBottom: '32px' }}>
        Map
      </h1>
      <h2 className='subtitle'>GPS Coordinates</h2>

      <MapContainer>
        <div className='containerCoordinates'>
          <div className='inputsCoordinates'>
            <TextField
              sx={{ maxWidth: '160px', '@media (max-width:900px)': { maxWidth: '100%', width: '100%' } }}
              id='standard-basic'
              label='Latitude'
              variant='standard'
            />
            <TextField
              sx={{ maxWidth: '160px', '@media (max-width:900px)': { maxWidth: '100%', width: '100%' } }}
              id='standard-basic'
              label='Longitude'
              variant='standard'
            />
          </div>
          <Button variant='outlined' sx={{ padding: '7px 22px', '@media (max-width:900px)': { marginTop: '20px' } }}>
            Choose location on the map
          </Button>
        </div>

        <div style={{ borderRadius: '8px', height: '500px', margin: '20px 0px 60px ' }}>
          <Mapa />
        </div>

        <ButtonContainer>
          <ColorButton
            sx={{
              maxWidth: '200px',
              '@media (max-width:900px)': { maxWidth: '100%', width: '100%', color: 'white' }
            }}
            color='success'
            variant='outlined'
            startIcon={<Icon icon='ic:baseline-save' />}
          >
            {' '}
            SAVE CHANGES
          </ColorButton>
          <Button
            sx={{ maxWidth: '200px', '@media (max-width:900px)': { maxWidth: '100%', width: '100%' } }}
            variant='contained'
            endIcon={<Icon icon='material-symbols:check' />}
          >
            ADD BOUND
          </Button>
        </ButtonContainer>
      </MapContainer>
    </AddressContainer>
  )
}

export default FormAddress

export const EditMap = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), [])

  const [value, setValue] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      setValue(2)
      console.log('hola')
    }, 1000)
  }, [])

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName='map-container'>
      <MarkerF position={center} key={value} />
    </GoogleMap>
  )
}

export const Mapa = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: '' })

  if (!isLoaded) return <div>Loading...</div>

  return <EditMap />
}
