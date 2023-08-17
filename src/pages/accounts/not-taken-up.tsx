// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import Table from 'src/views/accounts/Table'

const NotMaterializedAccounts = () => {

  return (
    <AccountsTableContextProvider>
      <Grid item xs={12}>
      <Card>
        <Table status='notTakenUp'/>
      </Card>
    </Grid>
    </AccountsTableContextProvider>
  )
}

NotMaterializedAccounts.acl = {
  action: 'viewNotTakenUpAccounts',
  subject: 'account'
}

export default NotMaterializedAccounts

