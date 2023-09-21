// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// ** Custom Components Imports
import UpdateBankView from 'src/views/catalogues/dynamic/update-bank'

const UpdateBank = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{overflow: 'inherit'}}>
          <UpdateBankView />
        </Card>
      </Grid>
    </>
  )
}

UpdateBank.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default UpdateBank
