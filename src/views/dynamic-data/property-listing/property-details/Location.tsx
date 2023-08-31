
// import { useEffect, useState } from 'react';

//** Dto imports */
import { LocationDto } from '@/services/dynamic-data/dtos/propertyListing.dto';

// ** MUI Imports
import Card from '@mui/material/Card';

//services imports
// import PropertiesServices from '@/services/dynamic-data/properties.mock-service';


type LocationProps = {
  locationData: LocationDto
}

const Location: React.FC<LocationProps> = ({locationData}) => {

  const subjects = [
    'Adress',
    'Neighborhood',
    'C. P.',
    'State',
    'State Code',
    'Province',
    'Province Code',
    'Latitude',
    'Longitude'
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [details, setDetails] = useState<LocationDto>(
  //   {
  //     address: '',
  //     neighborhood: '',
  //     postalCode: '',
  //     state: '',
  //     stateCode: '',
  //     province: '',
  //     provinceCode: '',
  //     latitude: '',
  //     longitude: ''
  //   })

  // const setDataInformation = async () => {
  //   const data = await PropertiesServices.getLocationDetails()


  //   if (!data) return

  //   const newData = {
  //     address: data.address || '',
  //     neighborhood: data.neighborhood || '',
  //     postalCode: data.postalCode || '',
  //     state: data.state || '',
  //     stateCode: data.stateCode || '',
  //     province: data.province || '',
  //     provinceCode: data.provinceCode || '',
  //     latitude: data.latitude || '',
  //     longitude: data.longitude || '',
  //   }
  //   setDetails(newData)
  // }

  // useEffect(() => {
  //   setDataInformation()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <Card>
      <div className="detail-table-wrapper">
        <div className='title'>
          Location
        </div>
        <div className='table'>
          {Object.keys(locationData).map((key, index) => (
            <div key={key} className={index % 2 === 0 ? 'item-row row-white' : 'item-row row-grey'} >
              <div className='item-col name'>
                {subjects[index]}
              </div>
              <div className='item-col'>
                {locationData[key as keyof typeof locationData]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default Location
