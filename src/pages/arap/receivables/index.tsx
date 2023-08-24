// ** MUI ImportsuseMultiTabButtons'
import Grid from '@mui/material/Grid'

const Receivables = () => {



  return (
    <Grid item xs={12}>
      <h1>Receivables view works</h1>
    </Grid>
  )
}

Receivables.acl = {
  action: 'viewReceivablesArap',
  subject: 'arap'
}

export default Receivables
