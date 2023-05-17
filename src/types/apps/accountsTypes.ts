export type IFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export type IAccounts = {
  accounts: any[]
  loading: boolean
  filters: IFilters[]
  formsData: any
}

interface IAccountsInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type IAccountFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface IAccountsState {
  current: IAccounts | null
  users: IAccounts[]
  loading: boolean
  filters: IAccountFilters[]
  info: IAccountsInfo
  temporalFilters: IAccounts[]
}
