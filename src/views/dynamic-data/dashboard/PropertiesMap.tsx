// ** MUI Imports
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


const PropertiesMap = () => {

  const mapSrc = "/images/pages/properties-map.png"

  return (
    <Card>
    <CardMedia
      sx={{ height: 460, backgroundSize: 'auto' }}
      image={mapSrc}
      title="properties map"
    />
  </Card>
  )
}

export default PropertiesMap
