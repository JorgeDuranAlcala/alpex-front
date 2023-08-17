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

export default MapProperties

// PopertiesMap.acl = {
//   action: 'viewMapPropertiesData',
//   subject: 'dynamicData'
// }

// export default PopertiesMap

