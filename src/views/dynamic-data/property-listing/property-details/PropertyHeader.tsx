// ** MUI Imports
import Card from '@mui/material/Card';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const PropertyHeader = () => {

  const headerData = {
    propertyid: '#06003_2',
    valfis: '19,833,668.07',
    type: 'Propiedad Federal',
    typology: 'Oficinas en General',
    zonacresta: '18'
  }

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
              {headerData.propertyid}
            </div>
          </div>
        </div>
        <div className='header-col'>
          <div className='header-row'>
            Valfis
          </div>
          <div className='header-row'>
            ${headerData.valfis} MXN
          </div>
        </div>
        <div className='header-col'>
          <div className='header-row'>
            Type:
          </div>
          <div className='header-row'>
            {headerData.type}
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
            {headerData.zonacresta}
          </div>
        </div>

      </div>
    </Card>
  )
}

export default PropertyHeader
