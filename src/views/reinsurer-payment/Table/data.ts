const data = [
  {
    accountId: 0,
    status: 'Pending',
    insured: 'Insured name',
    reinsurer: 'Reinsurer name',
    dueDate: '22/04/23',
    contributionPremium: '$100,000 USD',
    actions: ''
  },
  {
    accountId: 1,
    status: 'Paid',
    insured: 'Insured name',
    reinsurer: 'Reinsurer name',
    dueDate: '22/04/23',
    contributionPremium: '$100,000 USD',
    actions: ''
  },
  {
    accountId: 2,
    status: 'Unpaid',
    insured: 'Insured name',
    reinsurer: 'Reinsurer name',
    dueDate: '22/04/23',
    contributionPremium: '$100,000 USD',
    actions: ''
  }
]

const brokers = ['Broker name', 'Broker name', 'Broker name', 'Broker name']
const debt = ['Select currency', 'USD', 'MXN']
const status = ['Unpaid', 'Pending', 'Paid']
export { brokers, data, debt, status }
