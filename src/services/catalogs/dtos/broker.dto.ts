export interface BrokerDto {
  id: number
  alias?: string
  name: string
}

export interface BrokersDeleteDto {
  idDeleteList: number[]
}

export interface BrokerInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type BrokerFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface BrokersPaginationDto {
  filters: BrokerFiltersDto[]
  info: BrokerInfoDto
}
