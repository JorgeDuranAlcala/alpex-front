// ** MUI ImportsuseMultiTabButtons'
import Grid from '@mui/material/Grid'
import CrmTableHistory from '../../../Components/TableHistory'

const OverView = () => {
  return (
    <Grid item xs={12}>
      <CrmTableHistory />
    </Grid>
  )
}

OverView.acl = {
  action: 'viewFollowUpClaims',
  subject: 'claims'
}

export default OverView
