
import { BrokerDetailsView } from '@/views/arap/receivableBrokerDetails/BrokerDetailsView'
import Grid from '@mui/material/Grid'

const ReceivablesBroker = () => {


  return (
    <Grid item xs={12}>
      <BrokerDetailsView />
    </Grid>
  )
}

ReceivablesBroker.acl = {
  action: 'viewReceivableBrokerDetailsArap',
  subject: 'arap'
}

export default ReceivablesBroker
