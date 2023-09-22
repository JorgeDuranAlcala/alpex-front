
import { PayableView } from '@/views/arap/payable/PayableView'
import Grid from '@mui/material/Grid'

const Payables = () => {


  return (
    <Grid item xs={12}>
      <PayableView />
    </Grid>
  )
}

Payables.acl = {
  action: 'viewPayablesArap',
  subject: 'arap'
}

export default Payables
