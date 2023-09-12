
import { ReinsurerDetailsView } from '@/views/arap/payableReinsurerDetails/ReinsurerDetailsView'
import Grid from '@mui/material/Grid'

const PayablesReinsurer = () => {


  return (
    <Grid item xs={12}>
      <ReinsurerDetailsView />
    </Grid>
  )
}

PayablesReinsurer.acl = {
  action: 'viewPayablesReinsurerDetailsArap',
  subject: 'arap'
}

export default PayablesReinsurer
