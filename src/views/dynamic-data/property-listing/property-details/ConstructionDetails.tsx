import { useEffect, useState } from 'react';

//** Dto imports */
import { ConstructionDto } from '@/services/dynamic-data/dtos/propertyListing.dto';

// ** MUI Imports
import Card from '@mui/material/Card';

//services imports
import PropertiesServices from '@/services/dynamic-data/properties.mock-service';


const ConstructionDetail = () => {

  const subjects = [
    'Stories',
    'Structure',
    'Slab',
    'Foundation',
    'Construction Surface',
    'Surface Area',
    'Date'

  ]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [details, setDetails] = useState<ConstructionDto>(
    {
      stories: '',
      structure: '',
      slab: '',
      foundation: '',
      constructionSurface: '',
      surfaceArea: '',
      date: ''
    })


  const setDataInformation = async () => {
    const data = await PropertiesServices.getConstructionDetails()


    if (!data) return

    const newData = {
      stories: data.stories || '',
      structure: data.structure || '',
      slab: data.slab || '',
      foundation: data.foundation || '',
      constructionSurface: data.constructionSurface || '',
      surfaceArea: data.surfaceArea || '',
      date: data.date || ''
    }
    setDetails(newData)
  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <div className="detail-table-wrapper">
        <div className='title'>
          Construtcion detail
        </div>
        <div className='table'>

          {Object.keys(details).map((key, index) => (
            <div key={key} className={index % 2 === 0 ? 'item-row row-white' : 'item-row row-grey'} >
              <div className='item-col name'>
                {subjects[index]}
              </div>
              <div className='item-col'>
                {details[key as keyof typeof details]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default ConstructionDetail
