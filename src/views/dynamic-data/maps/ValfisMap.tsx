// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

const PropertiesMap = () => {

  const mapSrc = "/images/pages/properties-map.png"

  return (

    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>

        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <img
            src={mapSrc}
            alt="properties map"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

        </Card>
      </Grid>
    </Grid>
  )
}

export default PropertiesMap
