// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

// ** Custom Components Imports
import HurricaneMap from '@/views/dynamic-data/maps/HurricaneMap'

const MapEartquake= () => {

  return (
    <Container>
      <HurricaneMap />
    </Container>
  )
}

export default MapEartquake

