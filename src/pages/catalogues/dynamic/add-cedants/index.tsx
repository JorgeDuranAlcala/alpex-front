
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import CedantContacts from 'src/views/catalogues/dynamic/add-cedant/CedantContacts'
import CedantData from 'src/views/catalogues/dynamic/add-cedant/CedantData'

const AddCedantView = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{marginBottom: '15px'}}>
        <CedantData />
      </Card>
      <Card>
       <CedantContacts />
      </Card>
    </Grid>

  )
}

export default AddCedantView
