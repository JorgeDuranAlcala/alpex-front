export type IFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export type IProperties = {
  properties: any[]
  loading: boolean
  filters: IFilters[]
  propertyData: any
  id: number
}

interface IPropertiesInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type IPropertyFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface IPropertiesState {
  current: IProperties | null
  properties: IProperties[]
  loading: boolean
  filters: IPropertyFilters[]
  info: IPropertiesInfo
  temporalFilters: IProperties[]
}
