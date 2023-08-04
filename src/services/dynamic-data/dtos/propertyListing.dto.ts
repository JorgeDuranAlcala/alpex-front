
export interface IProperty {
  crestZone: string
  institution: string
  keyDepe: string
  latitude: string
  longitude: string
  province: string
  state: string
  valfisValue: string
}

export interface IPropertyTemp {
  id: string
  valfis: string
  nomEnt: string
  nomMun: string
  type: string
  typology: string
  surface: string
  zonacresta: string
}

export interface IPriorityProperty {
  id: string
  value: string
  state: string
  province: string
  institution: string
  crestaZone: number
}

export interface PropertyInfoDto {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type PropertyFiltersDto = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface PropertyPaginationDto {
  filters: PropertyFiltersDto[]
  info: PropertyInfoDto
}
