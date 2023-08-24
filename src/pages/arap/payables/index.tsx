// ** MUI ImportsuseMultiTabButtons'
import Grid from '@mui/material/Grid'

const Payables = () => {



  return (
    <Grid item xs={12}>
      <h1>Payables view works</h1>
    </Grid>
  )
}

Payables.acl = {
  action: 'viewPayablesArap',
  subject: 'arap'
}

export default Payables
