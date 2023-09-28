export interface GetReceivablesAllResponseDto {
  info: Info
  results: Result[]
}

export interface Info {
  count: number
  next: null
  page: number
  pages: number
  prev: null
  take: number
}

export interface Result {
  '0a30': string
  '31a60': string
  '61a90': string
  '91a120': string
  accountId: number
  capabilityId: number
  capabilityName: string
  currency: string
  opc120: string
  paidPercent: string
  totalDebt: string
}
