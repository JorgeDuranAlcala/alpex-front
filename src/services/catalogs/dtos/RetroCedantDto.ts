export interface RetroCedantDto {
  id: number
  name: string
  alias?: string
}

export interface RetroCedantsDeleteDto {
  idDeleteList: number[]
}

export interface RetroCedantInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type RetroCedantFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface RetroCedantsPaginationDto {
  filters: RetroCedantFiltersDto[]
  info: RetroCedantInfoDto
}
