// ** MUI ImportsuseMultiTabButtons'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import Table from 'src/views/accounts/Table'

const Accounts = () => {



  return (
    <AccountsTableContextProvider>
      <Grid item xs={12}>
        <Card>
          <Table />
        </Card>
      </Grid>
    </AccountsTableContextProvider>
  )
}

Accounts.acl = {
  action: 'viewAllAccounts',
  subject: 'account'
}

export default Accounts
