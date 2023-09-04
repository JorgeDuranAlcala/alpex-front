// ** MUI ImportsuseMultiTabButtons'
import { OverviewReceivableView } from '@/views/arap/overview/OverviewReceivableView'
import Grid from '@mui/material/Grid'

const OverViewReceivable = () => {



  return (
    <Grid item xs={12}>
      <OverviewReceivableView />
    </Grid>
  )
}

OverViewReceivable.acl = {
  action: 'viewOverviewReceivableArap',
  subject: 'arap'
}

export default OverViewReceivable
