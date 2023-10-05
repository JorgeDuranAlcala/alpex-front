import { ARAPTransactionValue } from '../interfaces/QueryFilters'

interface OptionsARAPTransactionProps {
  value: ARAPTransactionValue
  text: string
}

export const OptionsARAPTransaction: OptionsARAPTransactionProps[] = [
  {
    value: 'DYN',
    text: 'Claim'
  },
  {
    value: 'INST',
    text: 'Broker Pay'
  },
  {
    value: 'REC',
    text: 'Reinsurer Pay'
  }
]
