// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import Table from 'src/views/accounts/Table'

const PendingAccounts = () => {

  return (
    <AccountsTableContextProvider>
      <Grid item xs={12}>
      <Card>
        <Table status='pending'/>
      </Card>
    </Grid>
    </AccountsTableContextProvider>
  )
}

PendingAccounts.acl = {
  action: 'viewPendingAccounts',
  subject: 'account'
}

export default PendingAccounts

