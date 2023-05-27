
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import RetroCedantData from '@/views/catalogues/dynamic/add-retrocedant/RetroCedantData'
import RetroCedantContacts from 'src/views/catalogues/dynamic/add-retrocedant/RetroCedantContacts'

const AddRetroCedantView = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{marginBottom: '15px'}}>
        <RetroCedantData />
      </Card>
      <Card>
       <RetroCedantContacts />
      </Card>
    </Grid>

  )
}

export default AddRetroCedantView
