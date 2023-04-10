// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Table from 'src/views/accounts/Table'

const Accounts = () => {


  return (
    <Grid item xs={12}>
      <Card>
        <Table />
      </Card>
    </Grid>
  )
}

export default Accounts
