// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
// import Table from 'src/views/accounts/Table'

const ZonacrestaMap = () => {

  return (

      <Grid item xs={12}>
      <Card>
        map Zonacresta
      </Card>
    </Grid>

  )
}

ZonacrestaMap.acl = {
  action: 'viewZonaCrestaData',
  subject: 'dynamicData'
}

export default ZonacrestaMap

