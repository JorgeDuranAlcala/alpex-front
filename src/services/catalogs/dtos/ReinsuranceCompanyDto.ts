export interface ReinsuranceCompanyDto {
  id: number
  name: string
  special: boolean
  alias?: string
  idSubscriptionType?: number
}

interface SubscriptionTypeDto {
  id: number
  type: string
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface ReinsuranceCompanyTableDto {
  id: number
  name: string
  special?: boolean
  alias?: string
  idSubscriptionType?: SubscriptionTypeDto
}

export interface ReinsuranceCompanysDeleteDto {
  idDeleteList: number[]
}

export interface ReinsuranceCompanyInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type ReinsuranceCompanyFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface ReinsuranceCompanysPaginationDto {
  filters: ReinsuranceCompanyFiltersDto[]
  info: ReinsuranceCompanyInfoDto
}
