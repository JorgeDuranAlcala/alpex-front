export interface BrokerDto {
  id: number
  alias?: string
  name: string
}

export interface BrokersDeleteDto {
  idDeleteList: number[]
}
