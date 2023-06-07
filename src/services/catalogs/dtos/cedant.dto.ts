export interface CedantDto {
  id: number
  name: string
  alias?: string
  idCountry?: number
}

export interface CedantsDeleteDto {
  idDeleteList: number[]
}

export interface CedantInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type CedantFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface CedantsPaginationDto {
  filters: CedantFiltersDto[]
  info: CedantInfoDto
}
