// ** MUI Imports
import Card from '@mui/material/Card';

const BasicInfo = () => {

  const basicInfo = [
    {
      name: 'Name',
      value: 'XEEP RADIO EDUCACION'
    },
    {
      name: 'Institution',
      value: 'RADIO EDUCACION'
    },
    {
      name: 'Use of property',
      value: 'OFICINA'
    },
    {
      name: 'Sector',
      value: 'COMUNICACIÓN'
    },
    {
      name: 'Acronym',
      value: 'REDUC'
    },
    {
      name: 'Administration',
      value: 'FEDERAL'
    },

  ]

  return (
    <Card>
      <div className="detail-table-wrapper">
        <div className='title'>
          BasicInfo
        </div>
        <div className='table'>
          {basicInfo.map((item, index) => {
            return (
              <div className={index % 2 === 0 ? 'item-row row-white' : 'item-row row-grey'} key={index}>
                <div className='item-col name'>
                   {item.name}
                </div>
                <div className='item-col'>
                   {item.value}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

export default BasicInfo
