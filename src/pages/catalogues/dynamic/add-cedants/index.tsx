
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AddCedant from 'src/views/catalogues/dynamic/add-cedant/AddCedant'
import CedantContacts from 'src/views/catalogues/dynamic/add-cedant/CedantContacts'

const AddCedantView = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{marginBottom: '15px'}}>
        <AddCedant />
      </Card>
      <Card>
       <CedantContacts />
      </Card>
    </Grid>

  )
}

export default AddCedantView
