// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Information from 'src/views/accounts/new-account-steps/information'


const NewAccount = () => {


  return (
    <Grid item xs={12}>
      <Card>
        New Account header
      </Card>
      <Card>
        <div>Accoun Stepper</div>
        <Information/>
      </Card>
    </Grid>
  )
}

export default NewAccount