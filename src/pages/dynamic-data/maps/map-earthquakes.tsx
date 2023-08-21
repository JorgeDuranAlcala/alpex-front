// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

// ** Custom Components Imports
import EarthquakeMap from '@/views/dynamic-data/maps/EarthquakeMap'

const MapEartquake= () => {

  return (
    <Container>
      <EarthquakeMap />
    </Container>
  )
}

MapEartquake.acl = {
  action: 'viewEarthquakesData',
  subject: 'dynamicData'
}

export default MapEartquake
