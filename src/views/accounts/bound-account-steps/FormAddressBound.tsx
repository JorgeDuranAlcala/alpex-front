import {
  AddressContainer,
  ButtonContainer,
  FormContainer,
  MapContainer
} from '@/styled-components/accounts/Security.styled'
import { Button, TextField } from '@mui/material'

import { IAddress } from '@/types/apps/autocompleteAddressTypes'
import AutocompleteAddress from '@/views/components/inputs/autocomplete/AutocompleteAddress'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from 'src/@core/components/icon'

// ** Redux
import { useAppSelector } from '@/store'

// ** Utils
import { DisableForm } from 'src/views/accounts/new-account-steps/_commons/DisableForm'

export interface AddressInfo {
  addressLine1: string
  addressLine2: string
  country: number | string
  city: number | string
  state: number | string
  zipCode: string
  latitude: string | undefined
  longitude: string | undefined
}

interface AddressInfoErrors {
  addressLine1Error: boolean
  addressLine2Error: boolean
  countryError: boolean
  cityError: boolean
  stateError: boolean
  zipCodeError: boolean
}

type FormAddressProps = {
  disableSectionCtrl?: boolean
}

const FormAddress: React.FC<FormAddressProps> = ({ disableSectionCtrl }) => {
  // Redux
  const endorsementData = useAppSelector(state => state.endorsement.data)

  const mapRef = useRef<HTMLDivElement>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLng | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const mapEnabledRef = useRef<boolean>(false)
  const map = useRef<google.maps.Map | null>(null)
  const geocoder = useRef<google.maps.Geocoder | null>(null)
  const [mapEnabled, setMapEnabled] = useState<boolean>(mapEnabledRef.current)

  const [startValidations, setStartValidations] = useState(false)
  const [validateForm, setValidateForm] = useState<boolean>(true)
  const [address, setAddress] = useState<IAddress>({
    address: '',
    city: '',
    country: '',
    postalCode: '',
    route: '',
    state: '',
    streetNumber: ''
  })

  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: ''
  })
  const [errors, setErrors] = useState<AddressInfoErrors>({
    addressLine1Error: false,
    addressLine2Error: false,
    countryError: false,
    cityError: false,
    stateError: false,
    zipCodeError: false
  })

  const validations = (newAddresInfo: AddressInfo | null = null) => {
    const addressInfoTemp = newAddresInfo ? newAddresInfo : addressInfo

    const newErrors: AddressInfoErrors = {
      addressLine1Error: addressInfoTemp.addressLine1 === '' || addressInfoTemp.addressLine1 === undefined,
      addressLine2Error: addressInfoTemp.addressLine2 === '' || addressInfoTemp.addressLine2 === undefined,
      countryError: addressInfoTemp.country === '' || addressInfoTemp.country === undefined,
      cityError: addressInfoTemp.city === '' || addressInfoTemp.city === undefined,
      stateError: addressInfoTemp.state === '' || addressInfoTemp.state === undefined,
      zipCodeError: addressInfoTemp.zipCode === '' || addressInfoTemp.zipCode === undefined
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {
      setValidateForm(true)
    } else {
      setValidateForm(false)
    }
  }

  const handleEndorsement = () => {
    console.log('Los errors', errors)
    console.log('Toda la data para endoso', endorsementData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressInfo({ ...addressInfo, [name]: value })
    !validateForm && validations({ ...addressInfo, [name]: value })
  }

  // const handleSelectChange = (event: SelectChangeEvent<string>) => {
  //   const target = event.target
  //   const name = target.name
  //   const value = target.value
  //   let addressInfoTem = { ...addressInfo }
  //   addressInfoTem = {
  //     ...addressInfoTem,
  //     [name]: value
  //   }

  //   !validateForm && validations(addressInfoTem)
  //   setAddressInfo(addressInfoTem)
  // }

  const getErrorMessage = (name: keyof AddressInfoErrors) => {
    let errorMsj = 'This field is required'
    if (name == 'countryError' || name == 'cityError' || name == 'stateError') errorMsj = 'Tis action is required'

    return errors[name] ? errorMsj : ''
  }

  const handleChooseLocation = () => {
    mapEnabledRef.current = !mapEnabledRef.current
    setMapEnabled(mapEnabledRef.current)
  }

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      const selectedLocation = event.latLng
      setSelectedLocation(selectedLocation)
    }
  }

  useEffect(() => {
    if (startValidations) {
      validations()
      handleEndorsement()
      setValidateForm(false)
      setStartValidations(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValidations, setStartValidations])

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBn3_Ng2UuezOHu5Pqz6c7l1CC9z3tdjFQ',
        version: 'weekly'
      })

      const google = await loader.load()

      if (mapRef.current) {
        map.current = new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8
        })

        map.current.addListener('click', handleMapClick)
      }

      geocoder.current = new google.maps.Geocoder()
    }

    loadMap()
  }, [])

  useEffect(() => {
    const updateMarker = (location: google.maps.LatLng) => {
      if (map.current) {
        if (marker) {
          marker.setMap(null)
        }

        const newMarker = new google.maps.Marker({
          position: location,
          map: map.current,
          title: 'Selected Location'
        })

        map.current.setCenter(location)
        map.current.setZoom(18)
        setMarker(newMarker)
      }
    }

    const searchAddress = async () => {
      const { address: addressLine } = address
      const fullAddress = `${addressLine}`

      if (geocoder.current) {
        geocoder.current.geocode({ address: fullAddress }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            const location = results[0].geometry.location
            updateMarker(location)
          }
        })
      }
    }

    searchAddress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address.address])

  useEffect(() => {
    const updateMarkerOnMap = () => {
      if (map.current && selectedLocation) {
        if (marker) {
          marker.setMap(null)
        }

        const newMarker = new google.maps.Marker({
          position: selectedLocation,
          map: map.current,
          title: 'Selected Location'
        })

        const center = selectedLocation.toJSON()
        map.current.setCenter(center)
        map.current.setZoom(19)

        setMarker(newMarker)

        if (geocoder.current) {
          geocoder.current.geocode({ location: selectedLocation }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              const selectedAddress = results[0].formatted_address
              setSelectedAddress(selectedAddress)
            }
          })
        }
      }
    }
    setAddressInfo({
      ...addressInfo,
      latitude: selectedLocation?.lat().toString(),
      longitude: selectedLocation?.lng().toString()
    })
    updateMarkerOnMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation])

  return (
    <AddressContainer>
      <h1 className='title'>Address</h1>
      <DisableForm isDisabled={disableSectionCtrl} sg={2000}>
        <FormContainer>
          <div className='containerInputs'>
            {' '}
            <div style={{ width: '100%' }}>
              <AutocompleteAddress setAddress={setAddress}>
                <TextField
                  sx={{ width: '100%' }}
                  value={address.address && address.address}
                  defaultValue=''
                  onChange={({ target }) => {
                    setAddress({
                      ...address,
                      address: target.value
                    })
                  }}
                  id='address-line-1'
                  name='addressLine1'
                  label='Address Line 1'
                  disabled={mapEnabled}
                  error={!!errors.addressLine1Error}
                  helperText={getErrorMessage('addressLine1Error')}
                />
              </AutocompleteAddress>
            </div>
            {/* <FormControl fullWidth>
              <TextField
                sx={{ width: '100%' }}
                value={addressInfo.addressLine2}
                onChange={handleInputChange}
                id='address-line-2'
                name='addressLine2'
                label='Address Line 2'
                disabled={mapEnabled}
                error={!!errors.addressLine2Error}
                helperText={getErrorMessage('addressLine2Error')}
              />
            </FormControl> */}
          </div>
          <div className='containerInputs'>
            <TextField
              sx={{ width: '100%' }}
              value={address.country}
              defaultValue=''
              label='Country'
              disabled={mapEnabled}
              error={!!errors.countryError}
              helperText={getErrorMessage('countryError')}
            />
            <TextField
              sx={{ width: '100%' }}
              value={address.postalCode}
              id='zip-code'
              name='zipCode'
              label='Zip code'
              onChange={handleInputChange}
              disabled={mapEnabled}
              error={!!errors.zipCodeError}
              helperText={getErrorMessage('zipCodeError')}
            />
          </div>
          <div className='containerInputs'>
            {' '}
            <TextField
              sx={{ width: '100%' }}
              value={address.city}
              defaultValue=''
              label='City'
              disabled={mapEnabled}
              error={!!errors.cityError}
              helperText={getErrorMessage('cityError')}
            />
            <TextField
              sx={{ width: '100%' }}
              value={address.state}
              defaultValue=''
              label='State / Province'
              disabled={mapEnabled}
              error={!!errors.stateError}
              helperText={getErrorMessage('stateError')}
            />
          </div>
        </FormContainer>
      </DisableForm>
      <h1 className='title' style={{ marginTop: '40px', marginBottom: '32px' }}>
        Map
      </h1>
      <h2 className='subtitle'>GPS Coordinates</h2>

      <DisableForm isDisabled={disableSectionCtrl} sg={2000}>
        <MapContainer>
          <div className='containerCoordinates'>
            <div className='inputsCoordinates'>
              <TextField
                sx={{ maxWidth: '160px', '@media (max-width:900px)': { maxWidth: '100%', width: '100%' } }}
                value={addressInfo.latitude}
                id='standard-basic'
                label='Latitude'
                variant='standard'
                disabled={true}
              />
              <TextField
                sx={{ maxWidth: '160px', '@media (max-width:900px)': { maxWidth: '100%', width: '100%' } }}
                id='standard-basic'
                value={addressInfo.longitude}
                label='Longitude'
                variant='standard'
                disabled={true}
              />
            </div>
            <Button
              variant='outlined'
              sx={{ padding: '7px 22px', '@media (max-width:900px)': { marginTop: '20px' } }}
              onClick={handleChooseLocation}
            >
              {mapEnabled ? 'Choose location by address' : 'Choose location on the map'}
            </Button>
          </div>

          <div style={{ borderRadius: '8px', height: '500px', margin: '20px 0px 60px ' }}>
            <div ref={mapRef} style={{ width: '100%', minHeight: '500px' }} />
          </div>

          <ButtonContainer>
            <Button
              className='btn-endorsement'
              onClick={() => {
                setStartValidations(true)
              }}
              variant='contained'
              disabled={
                !endorsementData.initialized ||
                endorsementData.type?.toLocaleLowerCase() === 'informative' ||
                !endorsementData.type
              }
            >
              <div className='btn-icon' style={{ marginRight: '8px' }}>
                <Icon icon='material-symbols:approval-outline' />
              </div>
              ENDORSE
            </Button>
          </ButtonContainer>
        </MapContainer>
      </DisableForm>
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
