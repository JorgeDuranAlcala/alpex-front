// ** MUI Imports
import Card from '@mui/material/Card';


const PropertiesMap = () => {

  const mapSrc = "/images/pages/properties-map.png"

  return (

    <Card>
    {/* <CardMedia
      sx={{ minHeight: '450px', height: "100%", width: "100%", backgroundSize: 'contain' }}
      image={mapSrc}
      title="properties map"
    /> */}
  <img
        src={mapSrc}
        alt="properties map"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

   </Card>

  // <CardMedia
  //     sx={{ minHeight: '450px', height: "100%", width: "100%", backgroundSize: 'contain' }}
  //     image={mapSrc}
  //     title="properties map"
  //   />
  )
}

export default PropertiesMap
