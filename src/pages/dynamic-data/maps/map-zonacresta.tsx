// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

// ** Custom Components Imports
import ZonacrestaMap from '@/views/dynamic-data/maps/ZonacrestaMap'

const MapZonacresta = () => {

  return (
    <Container>
      <ZonacrestaMap />
    </Container>
  )
}

export default MapZonacresta

// ZonacrestaMap.acl = {
//   action: 'viewZonaCrestaData',
//   subject: 'dynamicData'
// }

// export default ZonacrestaMap

