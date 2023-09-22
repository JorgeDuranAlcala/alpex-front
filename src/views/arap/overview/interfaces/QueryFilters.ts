export type ARAPStatus = 'pending' | 'unpaid' | 'paid' | 'partially' | 'extra'
export type ARAPTransaction = 'claim' | 'reinsurer pay' | 'broker pay'
export type ARAPTransactionValue = 'DYN' | 'REC' | 'INST'
export type ARAPCapabilityName = 'broker' | 'reinsurer'

export interface QueryFilters {
  broker: string
  reinsurer: string
  status: 'all' | ARAPStatus
  transaction: 'all' | ARAPTransaction
  date: string
  id: string
  page?: number
}
