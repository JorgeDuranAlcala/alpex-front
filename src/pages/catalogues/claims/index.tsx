

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import CataloguesTabsView from 'src/views/catalogues/claims/CataloguesTabsView'

const CataloguesClaims = () => {

  return (

    <Grid item xs={12}>
      <Card sx={{overflow: 'inherit'}}>
        <CataloguesTabsView/>
      </Card>
    </Grid>

  )
}

CataloguesClaims.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default CataloguesClaims
