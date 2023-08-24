// ** MUI ImportsuseMultiTabButtons'
import { OverviewView } from '@/views/arap/overview/OverviewView'
import Grid from '@mui/material/Grid'

const OverView = () => {



  return (
    <Grid item xs={12}>
      <OverviewView />
    </Grid>
  )
}

OverView.acl = {
  action: 'viewOverviewArap',
  subject: 'arap'
}

export default OverView
