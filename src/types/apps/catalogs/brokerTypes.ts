interface IBroker {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  active: boolean
}

interface IBrokersInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type IBrokerFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface IBrokersState {
  current: IBroker | null
  brokers: IBroker[]
  loading: boolean
  filters: IBrokerFilters[]
  info: IBrokersInfo
  temporalFilters: IBroker[]
}
