const data = [
  {
    accountId: 0,
    installmentNumber: 12345678,
    status: 'Pending',
    broker: 'Broker name',
    insured: 'John doe',
    installment: '1/4',
    nextDueDate: '22/04/23',
    balanceDue: '$10,000',
    actions: ''
  },
  {
    accountId: 1,
    installmentNumber: 12345678,
    status: 'Unpaid',
    broker: 'Broker name',
    insured: 'John doe',
    installment: '1/4',
    nextDueDate: '22/04/23',
    balanceDue: '$10,000',
    actions: ''
  }
]

const brokers = ['Broker name', 'Broker name', 'Broker name', 'Broker name']
const debt = ['Select currency', 'USD', 'MXN']
const status = ['Unpaid', 'Pending', 'Paid']
export { brokers, data, debt, status }
