
import { ReceivableView } from '@/views/arap/receivable/ReceivableView'
import Grid from '@mui/material/Grid'

const Receivables = () => {



  return (
    <Grid item xs={12}>
      <ReceivableView />
    </Grid>
  )
}

Receivables.acl = {
  action: 'viewReceivablesArap',
  subject: 'arap'
}

export default Receivables
