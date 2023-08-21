// ** MUI Imports
import Card from '@mui/material/Card';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

//** Dto imports  */
import { PropertyGeneralDto } from '@/services/dynamic-data/dtos/propertyListing.dto';

type PropertyHeaderProps = {
  headerData: PropertyGeneralDto
}


const PropertyHeader: React.FC<PropertyHeaderProps> = ({headerData}) => {

  return (
    <Card>
      <div className='property-header-wrapper'>
        <div className='header-col' style={{gap: '10px'}}>
          <CustomAvatar skin='light' variant='rounded' color={'primary'}>
            <Icon icon='mdi:currency-usd' />
          </CustomAvatar>
          <div>
            <div className='header-row'>
              Property ID:
            </div>
            <div className='header-row' style={{ color: '#2535A8' }}>
              {headerData.properyId}
            </div>
          </div>
        </div>
        <div className='header-col'>
          <div className='header-row'>
            Valfis
          </div>
          <div className='header-row'>
            ${headerData.replacementValue} MXN
          </div>
        </div>
        <div className='header-col'>
          <div className='header-row'>
            Type:
          </div>
          <div className='header-row'>
            {headerData.institution}
          </div>
        </div>
        <div className='header-col'>
          <div className='header-row'>
            Typology:
          </div>
          <div className='header-row'>
            {headerData.typology}
          </div>
        </div>
        <div className='header-col'>
          <div className='header-row'>
            Zonacresta:
          </div>
          <div className='header-row'>
            {headerData.crestZone}
          </div>
        </div>

      </div>
    </Card>
  )
}

export default PropertyHeader
