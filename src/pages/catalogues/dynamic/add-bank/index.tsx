// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import AddBankView from 'src/views/catalogues/dynamic/add-bank'

const AddBank = () => {
  return (
    <>
      <Grid item xs={12}>
        <Card sx={{overflow: 'inherit'}}>
          <AddBankView title={"Add new Bank"} subTitle={""} />
        </Card>
      </Grid>
    </>
  )
}

AddBank.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default AddBank
