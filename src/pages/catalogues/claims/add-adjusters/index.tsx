// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import AddAdjusterView from 'src/views/catalogues/claims/adjuster/add-adjuster/AddAdjusterView'

const AddAdjuster = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{overflow: 'inherit'}}>
          <AddAdjusterView title={"Add new Adjuster"} subTitle={""} />
        </Card>
      </Grid>
    </>
  )
}

AddAdjuster.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default AddAdjuster
