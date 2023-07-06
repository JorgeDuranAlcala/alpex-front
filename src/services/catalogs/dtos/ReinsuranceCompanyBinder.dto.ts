export interface ReinsuranceCompanyBinderDto {
  id?: number
  referenceNumber: string
  idCReinsuranceCompany: number
}

export interface ReinsuranceCompanyBindersDeleteDto {
  idDeleteList: number[]
}

export interface ReinsuranceCompanyBinderTableDto {
  id: number
  referenceNumber: string
  idCReinsuranceCompany: number
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface ReinsuranceCompanyBindersInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type ReinsuranceCompanyBinderFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface ReinsuranceCompanyBindersPaginationDto {
  idCReinsuranceCompany: number
  filters: ReinsuranceCompanyBinderFiltersDto[]
  info: ReinsuranceCompanyBindersInfoDto
}
