export interface CedantContactDto {
  id: number
  name: string
  email: string
  phone: string
  idCCedant: number
  idCCountry: number
}

export interface CedantContactsDeleteDto {
  idDeleteList: number[]
}

interface CountryDto {
  id: number
  name: string
  currency: string
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface CedantContactTableDto {
  id: number
  name: string
  email: string
  phone: string
  idCCedant: number
  idCCountry: CountryDto
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface CedantContactsInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type CedantContactFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface CedantContactsPaginationDto {
  idCCedant: number
  filters: CedantContactFiltersDto[]
  info: CedantContactsInfoDto
}
