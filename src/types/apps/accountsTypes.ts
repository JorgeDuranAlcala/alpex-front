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
