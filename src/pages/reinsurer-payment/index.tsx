// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

import Table from 'src/views/reinsurer-payment/Table'

const ReinsurerPayment = () => {
  return (
    <Container>
      <Table />
    </Container>
  )
}

ReinsurerPayment.acl = {
  action: 'viewReinsurerPayment',
  subject: 'payments'
}

export default ReinsurerPayment
