
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AddBroker from 'src/views/catalogues/dynamic/add-broker/AddBroker'
import BrokerContacts from 'src/views/catalogues/dynamic/add-broker/BrokerContacts'

const AddBrokerView = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{marginBottom: '15px'}}>
        <AddBroker />
      </Card>
      <Card>
       <BrokerContacts />
      </Card>
    </Grid>

  )
}

export default AddBrokerView
