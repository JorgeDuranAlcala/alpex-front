// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

import Table from 'src/views/broker-tracker/Table'

const BrokerTracker = () => {
  return (
    <Container>
      <Table />
    </Container>
  )
}

BrokerTracker.acl = {
  action: 'viewBrokerTrackerPayment',
  subject: 'payments'
}

export default BrokerTracker
