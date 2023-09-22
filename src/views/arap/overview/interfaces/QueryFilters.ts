export type ARAPStatus = 'pending' | 'unpaid' | 'paid' | 'partially' | 'extra'
export type ARAPTransaction = 'claim' | 'reinsurer pay' | 'broker pay'
export type ARAPTransactionValue = 'DYN' | 'REC' | 'INST'
export type ARAPCapabilityName = 'broker' | 'reinsurer'

export interface QueryFilters {
  broker: string
  reinsurer: string
  status: 'all' | ARAPStatus
  transactionType: 'all' | ARAPTransactionValue
  date: string
  id?: string
  transaction?: string
  page?: number
  amount?: number
  capabilityName?: string
}
