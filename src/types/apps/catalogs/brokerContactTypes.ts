interface IBrokerContact {
  id: number
  name: string
  email: string
  phone: string
  idCBroker: number
  idCCountry: number
  createdAt: string
  updatedAt: string
  active: boolean
}

interface IBrokerContactsInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type IBrokerContactFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface IBrokerContactsState {
  idCBroker: number
  current: IBrokerContact | null
  brokerContacts: IBrokerContact[]
  loading: boolean
  filters: IBrokerContactFilters[]
  info: IBrokerContactsInfo
  temporalFilters: IBrokerContact[]
}
