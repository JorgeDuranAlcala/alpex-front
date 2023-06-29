import {
  AddressContainer,
  ButtonContainer,
  FormContainer,
  MapContainer
} from '@/styled-components/accounts/Security.styled'
import { Button, TextField } from '@mui/material'
import { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { useEffect, useMemo, useState } from 'react'
import Icon from 'src/@core/components/icon'

const ColorButton = styled(Button)<ButtonProps>(({}) => ({
  color: '#64C623',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#64C623'
  }
}))

const FormAddress = () => {
  return (
    <AddressContainer>
      <h1 className='title'>Address</h1>
      <FormContainer>
        <div className='containerInputs'>
          {' '}
          <TextField
            sx={{ width: '100%' }}
            id='outlined-password-input'
            label='Address Line 1'
            autoComplete='current-password'
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-password-input'
            label='Address Line 2'
            autoComplete='current-password'
          />
        </div>
        <div className='containerInputs'>
          {' '}
          <TextField
            sx={{ width: '100%' }}
            id='outlined-password-input'
            label='Country'
            autoComplete='current-password'
          />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-password-input'
            label='Zip Code'
            autoComplete='current-password'
          />
        </div>
        <div className='containerInputs'>
          {' '}
          <TextField sx={{ width: '100%' }} id='outlined-password-input' label='City' autoComplete='current-password' />
          <TextField
            sx={{ width: '100%' }}
            id='outlined-password-input'
            label='State/Province'
            autoComplete='current-password'
          />
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
