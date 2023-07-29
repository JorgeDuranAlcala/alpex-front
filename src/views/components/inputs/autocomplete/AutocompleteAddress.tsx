import { IAddress } from '@/types/apps/autocompleteAddressTypes'
import { Autocomplete, LoadScript } from '@react-google-maps/api'
import { Dispatch, SetStateAction } from 'react'

interface PropsAutcompleteAddress {
  children: JSX.Element
  setAddress: Dispatch<SetStateAction<IAddress>>
}
const AutocompleteAddress = ({ children, setAddress }: PropsAutcompleteAddress) => {
  const addressInfo: IAddress = {
    address: '',
    city: '',
    country: '',
    postalCode: '',
    route: '',
    state: '',
    streetNumber: ''
  }
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      addressInfo.streetNumber = ''
      addressInfo.city = ''
      addressInfo.country = ''
      addressInfo.postalCode = ''
      addressInfo.state = ''
      addressInfo.route = ''      
      addressInfo.address = place.formatted_address
      for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0]
        switch (componentType) {
          case 'street_number': {
            addressInfo.streetNumber = component.long_name
            break
          }
          case 'route': {
            addressInfo.route = component.short_name
            break
          }

          case 'postal_code': {
            addressInfo.postalCode = `${component.long_name}`
            break
          }

          case 'locality':
            addressInfo.city = component.long_name
            break

          case 'administrative_area_level_1': {
            addressInfo.state = component.long_name
            break
          }

          case 'country':
            addressInfo.country = component.long_name
            break
        }
      }
      setAddress(addressInfo)
    })
  }

  return (
    <LoadScript googleMapsApiKey='AIzaSyBn3_Ng2UuezOHu5Pqz6c7l1CC9z3tdjFQ' libraries={['places']}>
      <Autocomplete onLoad={onLoad} fields={['address_components', 'formatted_address']} types={['address']}>
        {children}
      </Autocomplete>
    </LoadScript>
  )
}

export default AutocompleteAddress
