

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import CataloguesTabsView from 'src/views/catalogues/dynamic/CataloguesTabsView'

const Catalogues = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{overflow: 'inherit'}}>
        <CataloguesTabsView/>
      </Card>
    </Grid>

  )
}

export default Catalogues
