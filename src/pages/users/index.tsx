// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context

// ** Custom Components Imports
import AddUser from 'src/views/users/forms/AddUser'

const Accounts = () => {
  return (
    <Grid item xs={12} sx={{ minHeight: '100%' }}>
      <Card sx={{ padding: '16px', minHeight: '100%' }}>
        <AddUser></AddUser>
      </Card>
    </Grid>
  )
}

export default Accounts
