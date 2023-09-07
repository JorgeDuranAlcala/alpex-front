
// import { useEffect, useState } from 'react';

//** Dto imports */
import { BasicInfoDto } from '@/services/dynamic-data/dtos/propertyListing.dto';

// ** MUI Imports
import Card from '@mui/material/Card';

//services imports
// import PropertiesServices from '@/services/dynamic-data/properties.mock-service';

type BasicInfoProps = {
  basicInfoData: BasicInfoDto
}


const BasicInfo: React.FC<BasicInfoProps> = ({basicInfoData}) => {


  const subjects = [
    'Name',
    'Type',
    'Use of property',
    'Sector',
    'Acronym',
    'Administration'
  ]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [details, setDetails] = useState<BasicInfoDto>(basicInfoData)


  // const setDataInformation = async () => {
  //   const data = await PropertiesServices.getBasicInfo()


  //   if (!data) return

  //   const newData = {
  //     name: data.name || '',
  //     insitution: data.insitution || '',
  //     use: data.use || '',
  //     sector: data.sector || '',
  //     acronym: data.acronym || '',
  //     administration: data.administration || '',
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
          BasicInfo
        </div>
        <div className='table'>
        {Object.keys(basicInfoData).map((key, index) => (
            <div key={key} className={index % 2 === 0 ? 'item-row row-white' : 'item-row row-grey'} >
              <div className='item-col name'>
                {subjects[index]}
              </div>
              <div className='item-col'>
                {basicInfoData[key as keyof typeof basicInfoData]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default BasicInfo