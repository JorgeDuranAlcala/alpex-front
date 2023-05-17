
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AddReinsurer from 'src/views/catalogues/dynamic/add-reinsurer/AddReinsurer'
import ReinsurerBinders from 'src/views/catalogues/dynamic/add-reinsurer/ReinsurerBinders'
import ReinsurerContacts from 'src/views/catalogues/dynamic/add-reinsurer/ReinsurerContacts'


const AddReinsurerView = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{marginBottom: '15px'}}>
        <AddReinsurer />
      </Card>
      <Card sx={{marginBottom: '15px'}}>
       <ReinsurerContacts />
      </Card>
      <Card>
       <ReinsurerBinders />
      </Card>
    </Grid>

  )
}

export default AddReinsurerView