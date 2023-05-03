export type IFilters = {
  type: string
  value: string
  subtype?: string
}

export type IAccounts = {
  accounts: any[]
  loading: boolean
  filters: IFilters[]
}
