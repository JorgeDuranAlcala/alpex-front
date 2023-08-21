// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

// ** Custom Components Imports
import PropertiesMap from '@/views/dynamic-data/maps/PopertiesMap'

const MapProperties = () => {

  return (
    <Container>
      <PropertiesMap />
    </Container>
  )
}

MapProperties.acl = {
  action: 'viewMapPropertiesData',
  subject: 'dynamicData'
}

export default MapProperties
