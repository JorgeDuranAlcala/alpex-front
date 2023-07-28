// ** MUI ImportsuseMultiTabButtons'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context

// ** Custom Components Imports
import PropertyListingTable from 'src/views/dynamic-data/property-listing'

const PropertyListing = () => {



  return (

      <Grid item xs={12}>
        <Card>
          <PropertyListingTable />
        </Card>
      </Grid>

  )
}

export default PropertyListing
