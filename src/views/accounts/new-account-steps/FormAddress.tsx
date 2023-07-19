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

import { Loader } from "@googlemaps/js-api-loader";
import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from 'src/@core/components/icon';
import { useGetAllCountries as useCountryGetAll } from 'src/hooks/catalogs/country';

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

const ColorButton = styled(Button)<ButtonProps>(({ }) => ({
  color: '#64C623',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#64C623'
  }
}))

const FormAddress = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLng | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const mapEnabledRef = useRef<boolean>(false);
  const map = useRef<google.maps.Map | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const [mapEnabled, setMapEnabled] = useState<boolean>(mapEnabledRef.current);
  const { countries } = useCountryGetAll()
  const [startValidations, setStartValidations] = useState(false)
  const [validateForm, setValidateForm] = useState<boolean>(true)
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',

  })
  const [errors, setErrors] = useState<AddressInfoErrors>({
    addressLine1Error: false,
    addressLine2Error: false,
    countryError: false,
    cityError: false,
    stateError: false,
    zipCodeError: false,
  })

  const validations = (newAddresInfo: AddressInfo | null = null) => {
    const addressInfoTemp = newAddresInfo ? newAddresInfo : addressInfo

    const newErrors: AddressInfoErrors = {
      addressLine1Error: addressInfoTemp.addressLine1 === '' || addressInfoTemp.addressLine1 === undefined,
      addressLine2Error: addressInfoTemp.addressLine2 === '' || addressInfoTemp.addressLine2 === undefined,
      countryError: addressInfoTemp.country === '' || addressInfoTemp.country === undefined,
      cityError: addressInfoTemp.city === '' || addressInfoTemp.city === undefined,
      stateError: addressInfoTemp.state === '' || addressInfoTemp.state === undefined,
      zipCodeError: addressInfoTemp.zipCode === '' || addressInfoTemp.zipCode === undefined,

    }

    setErrors(newErrors)

    if (Object.values(newErrors).every(error => !error)) {

      setValidateForm(true)
    } else {
      setValidateForm(false)
    }
  }

  const findNameById = (type: string, id: number): string => {

    switch(type){
      case 'country':
        const country = countries.find((c) => c.id === id);

        return country ? country.name : '';

      case 'city':
        const city = countries.find((c) => c.id === id);

        return city ? city.name : '';

      case 'state':
        const state = countries.find((c) => c.id === id);

        return state ? state.name : '';

      default:

        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressInfo({ ...addressInfo, [name]: value })
    !validateForm && validations({ ...addressInfo, [name]: value })
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

    !validateForm && validations(addressInfoTem)
    setAddressInfo(addressInfoTem)
  }

  const getErrorMessage = (name: keyof AddressInfoErrors) => {
    let errorMsj = 'This field is required'
    if (name == 'countryError' || name == 'cityError' || name == 'stateError')
      errorMsj = 'Tis action is required'


    return errors[name] ? errorMsj : ''
  }

  const handleChooseLocation = () => {
    mapEnabledRef.current = !mapEnabledRef.current;
    setMapEnabled(mapEnabledRef.current);

  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      const selectedLocation = event.latLng;
      setSelectedLocation(selectedLocation);
    }
  };

  useEffect(() => {
    if (startValidations) {
      validations()
      setValidateForm(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValidations, setStartValidations])


  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyBn3_Ng2UuezOHu5Pqz6c7l1CC9z3tdjFQ",
        version: "weekly",
      });

      const google = await loader.load();

      if (mapRef.current) {
        map.current = new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });

        map.current.addListener("click", handleMapClick);

      }

      geocoder.current = new google.maps.Geocoder();
    };

    loadMap();
  }, []);

  useEffect(() => {
    const updateMarker = (location: google.maps.LatLng) => {
      if (map.current) {
        if (marker) {
          marker.setMap(null);
        }

        const newMarker = new google.maps.Marker({
          position: location,
          map: map.current,
          title: "Selected Location",
        });

        map.current.setCenter(location);
        map.current.setZoom(18);
        setMarker(newMarker);
      }
    };

    const searchAddress = async () => {
      const { addressLine1, addressLine2, zipCode, country, city, state } = addressInfo;

      const countryName = findNameById('country', Number(country))
      const fullAddress = `${addressLine1} ${addressLine2}, ${city}, ${state} ${zipCode}, ${countryName}`;

      if (geocoder.current) {
        geocoder.current.geocode({ address: fullAddress }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            const location = results[0].geometry.location;
            updateMarker(location);
          }
        });
      }
    };

    searchAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addressInfo.addressLine1,
    addressInfo.addressLine2,
    addressInfo.city,
    addressInfo.country,
    addressInfo.zipCode,
    addressInfo.state
  ]);

  useEffect(() => {
    const updateMarkerOnMap = () => {
      if (map.current && selectedLocation) {

        if (marker) {
          marker.setMap(null);
        }

        const newMarker = new google.maps.Marker({
          position: selectedLocation,
          map: map.current,
          title: "Selected Location",
        });

        const center = selectedLocation.toJSON();
        map.current.setCenter(center);
        map.current.setZoom(19);

        setMarker(newMarker);

        if (geocoder.current) {
          geocoder.current.geocode({ location: selectedLocation }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              const selectedAddress = results[0].formatted_address;
              setSelectedAddress(selectedAddress);
            }
          });
        }
      }
    };
    setAddressInfo({
      ...addressInfo,
      latitude: selectedLocation?.lat().toString(),
      longitude: selectedLocation?.lng().toString()
    })
    updateMarkerOnMap();
  }, [selectedLocation]);


  return (
    <AddressContainer>
      <h1 className='title'>Address</h1>
      <FormContainer>
        <div className='containerInputs'>
          {' '}
          <TextField
            sx={{ width: '100%' }}
            value={addressInfo.addressLine1}
            defaultValue=''
            onChange={handleInputChange}
            id='address-line-1'
            name="addressLine1"
            label='Address Line 1'
            disabled={mapEnabled}
            error={!!errors.addressLine1Error}
            helperText={getErrorMessage('addressLine1Error')}
          />
          <FormControl fullWidth >
            <TextField
              sx={{ width: '100%' }}
              value={addressInfo.addressLine2}
              onChange={handleInputChange}
              id='address-line-2'
              name="addressLine2"
              label='Address Line 2'
              disabled={mapEnabled}
              error={!!errors.addressLine2Error}
              helperText={getErrorMessage('addressLine2Error')}
            />
          </FormControl>

        </div>
        <div className='containerInputs'>
          <FormControl fullWidth error={errors.countryError}>
            <InputLabel>Country</InputLabel>

            <Select
              name='country'
              label='Country'
              defaultValue={''}
              value={String(addressInfo.country)}
              onChange={handleSelectChange}
              labelId='invoice-country'
              disabled={mapEnabled}
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
            id='zip-code'
            name="zipCode"
            label='Zip code'
            onChange={handleInputChange}
            disabled={mapEnabled}
            error={!!errors.zipCodeError}
            helperText={getErrorMessage('zipCodeError')}
          />

        </div>
        <div className='containerInputs'>
          {' '}
          <FormControl fullWidth error={errors.cityError}>
            <InputLabel>City</InputLabel>

            <Select
              name='city'
              label='City'
              defaultValue={''}
              value={String(addressInfo.city)}
              onChange={handleSelectChange}
              labelId='city'
              disabled={mapEnabled}
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

            {errors.cityError && (
              <FormHelperText sx={{ color: 'error.main' }} id='city-error'>
                {getErrorMessage('cityError')}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={errors.stateError}>
            <InputLabel>State / Province</InputLabel>

            <Select
              name='state'
              label='State / Province'
              defaultValue={''}
              value={String(addressInfo.state)}
              onChange={handleSelectChange}
              labelId='city'
              disabled={mapEnabled}
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

            {errors.stateError && (
              <FormHelperText sx={{ color: 'error.main' }} id='state-error'>
                {getErrorMessage('stateError')}
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
            {mapEnabled ? 'Choose location by address' :'Choose location on the map'}
          </Button>
        </div>

        <div style={{ borderRadius: '8px', height: '500px', margin: '20px 0px 60px ' }}>
          <div ref={mapRef} style={{ width: "100%", minHeight: "500px" }} />
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
            onClick={() => {
              setStartValidations(true)
            }}
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
