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
    text: 'Reinsurer Pay'
  },
  {
    value: 'REC',
    text: 'Broker Pay'
  }
]
