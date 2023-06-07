export interface ReinsuranceCompanyContactDto {
  id: number
  name: string
  email: string
  phone: string
  idCReinsuranceCompany: number
  idCCountry: number
}

export interface ReinsuranceCompanyContactsDeleteDto {
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

export interface ReinsuranceCompanyContactTableDto {
  id: number
  name: string
  email: string
  phone: string
  idCReinsuranceCompany: number
  idCCountry: CountryDto
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface ReinsuranceCompanyContactsInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type ReinsuranceCompanyContactFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface ReinsuranceCompanyContactsPaginationDto {
  idCReinsuranceCompany: number
  filters: ReinsuranceCompanyContactFiltersDto[]
  info: ReinsuranceCompanyContactsInfoDto
}
