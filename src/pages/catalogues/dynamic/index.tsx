// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import BrokerTable from 'src/views/catalogues/dynamic/broker-table'

const Catalogues = () => {

  return (

    <Grid item xs={12}>
      <Card>
        <BrokerTable />
      </Card>
    </Grid>

  )
}

export default Catalogues
