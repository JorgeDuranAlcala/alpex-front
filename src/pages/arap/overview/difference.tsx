// ** MUI ImportsuseMultiTabButtons'
import { OverviewDifferenceView } from '@/views/arap/overview/OverviewDifferenceView'
import Grid from '@mui/material/Grid'

const OverViewDifference = () => {



  return (
    <Grid item xs={12}>
      <OverviewDifferenceView />
    </Grid>
  )
}

OverViewDifference.acl = {
  action: 'viewOverviewDifferenceArap',
  subject: 'arap'
}

export default OverViewDifference
