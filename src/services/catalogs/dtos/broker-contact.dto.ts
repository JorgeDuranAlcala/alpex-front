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
