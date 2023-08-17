// ** MUI Imports
import { Container } from 'src/styles/Dashboard/dashboard'

import Table from 'src/views/installments/Table'

const Installments = () => {
  return (
    <Container>
      <Table />
    </Container>
  )
}

Installments.acl = {
  action: 'viewInstallmentsPayment',
  subject: 'payments'
}

export default Installments
