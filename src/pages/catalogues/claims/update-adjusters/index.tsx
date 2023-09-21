// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import UpdateAdjusterView from 'src/views/catalogues/claims/adjuster/update-adjuster/'

const UpdateAdjuster = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{overflow: 'inherit'}}>
          <UpdateAdjusterView />
        </Card>
      </Grid>
    </>
  )
}

UpdateAdjuster.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default UpdateAdjuster
