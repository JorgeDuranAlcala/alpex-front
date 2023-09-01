// ** MUI ImportsuseMultiTabButtons'
import { OverviewPayableView } from '@/views/arap/overview/OverviewPayableView'
import Grid from '@mui/material/Grid'

const OverViewPayable = () => {



  return (
    <Grid item xs={12}>
      <OverviewPayableView />
    </Grid>
  )
}

OverViewPayable.acl = {
  action: 'viewOverviewPayableArap',
  subject: 'arap'
}

export default OverViewPayable
