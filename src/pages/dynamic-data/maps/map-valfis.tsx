// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
// import Table from 'src/views/accounts/Table'

const ValfisMap = () => {

  return (

      <Grid item xs={12}>
      <Card>
        map Valfis
      </Card>
    </Grid>

  )
}

ValfisMap.acl = {
  action: 'viewMapValfisData',
  subject: 'dynamicData'
}

export default ValfisMap

