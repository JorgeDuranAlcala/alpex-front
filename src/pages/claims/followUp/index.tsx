// ** MUI ImportsuseMultiTabButtons'
import { OverviewView } from '@/views/claims/followUp/FollowUpView'
import Grid from '@mui/material/Grid'

const OverView = () => {



  return (
    <Grid item xs={12}>
      <OverviewView />
    </Grid>
  )
}

OverView.acl = {
  action: 'viewFollowUpClaims',
  subject: 'claims'
}

export default OverView
