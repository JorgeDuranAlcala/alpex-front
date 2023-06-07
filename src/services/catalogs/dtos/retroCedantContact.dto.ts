export interface RetroCedantContactDto {
  id: number
  name: string
  email: string
  phone: string
  idCRetroCedant: number
  idCCountry: number
  __idCCountry__?: {
    id: number
  }
}

export interface RetroCedantContactsDeleteDto {
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

export interface RetroCedantContactTableDto {
  id: number
  name: string
  email: string
  phone: string
  idCRetroCedant: number
  idCCountry: CountryDto
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface RetroCedantContactsInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type RetroCedantContactFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface RetroCedantContactsPaginationDto {
  idCRetroCedant: number
  filters: RetroCedantContactFiltersDto[]
  info: RetroCedantContactsInfoDto
}
