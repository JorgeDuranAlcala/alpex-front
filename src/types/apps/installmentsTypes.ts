export interface IInstallmentState {
  accounts: IAccounts[]
  loading: boolean
  filters: IAccountFilters[]
  info: IAccountsInfo
}

export interface IBrokerTrackerState {
  accounts: IAccounts[]
  loading: boolean
  filters: IAccountFilters[]
  info: IBrokerTrackerInfo
}
interface IAccountsInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

interface IBrokerTrackerInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
  idBroker: string
}

export type IAccountFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export type IAccounts = {
  accountId: number
  installmentNumber: number
  status: string
  broker: string
  insured: string
  installment: string
  nextDueDate: string
  balanceDue: string
  actions: string
}
