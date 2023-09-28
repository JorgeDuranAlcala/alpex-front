import { Filter, PagesInfo } from '../../../_commons/interfaces/Grid'
import { ARAPStatus, ARAPTransaction } from '../QueryFilters'

export interface PaymentsGridInfo extends PagesInfo, ArapTotals {}
export interface PaymentsGrid {
  paymentsGridList: PaymentColumn[]
  isLoading: boolean
  filters: Filter[]
  info: PaymentsGridInfo
}

export interface PaymentColumn {
  id: number
  transactionId: string
  capabilityName: string
  status: ARAPStatus
  transaction: ARAPTransaction
  amount: number
  currency: string
  transactionDate: string

  // format?: (value: number) => string;
}

export interface ArapTotals {
  currency: string
  receivable: {
    totalAmountBroker: string
  }
  payable: {
    totalAmountReinsurer: string
  }
  difference: string
}
