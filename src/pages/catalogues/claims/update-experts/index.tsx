// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import UpdateExpertView from 'src/views/catalogues/claims/expert/update-expert/'

const UpdateExpert = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{overflow: 'inherit'}}>
          <UpdateExpertView />
        </Card>
      </Grid>
    </>
  )
}

UpdateExpert.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default UpdateExpert
