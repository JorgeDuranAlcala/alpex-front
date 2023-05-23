export interface BrokerContactDto {
  id: number
  name: string
  email: string
  phone: string
  idCBroker: number
  idCCountry: number
}

export interface BrokerContactsDeleteDto {
  idDeleteList: number[]
}

interface ICountry {
  id: number
  name: string
  currency: string
  createdAt: string
  updatedAt: string
  active: boolean
}

interface IBrokerContact {
  id: number
  name: string
  email: string
  phone: string
  idCBroker: number
  idCCountry: ICountry
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
  brokerContacts: IBrokerContact[]
  filters: IBrokerContactFilters[]
  info: IBrokerContactsInfo
}
