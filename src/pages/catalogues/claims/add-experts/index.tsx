// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import AddExpertView from 'src/views/catalogues/claims/expert/add-expert/'

const AddExpert = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{overflow: 'inherit'}}>
          <AddExpertView title={"Add new Expert"} subTitle={""} />
        </Card>
      </Grid>
    </>
  )
}

AddExpert.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default AddExpert
