
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

export interface IPropertyDetailDto {
  general: {
      properyId: string,
      replacementValue: string,
      institution: string,
      typology:string,
      crestZone: string,
  },
  basicInfo: {
      name: string,
      type:string,
      useOfProperty: string,
      sector: string,
      acronym: string,
      administration:string,
  },
  location: {
      address: string,
      neighborhood: string,
      cp: string,
      state: string,
      stateCode: string,
      province: string,
      provinceCode: string,
      latitude: string,
      longitude: string,
  },
  constructionDetails: {
      stories: string,
      structure: string,
      slab: string,
      foundation: string,
      constructionSurface: string,
      surfaceArea: string,
      date: string,
  }
}

export type PropertyGeneralDto = {
  properyId: string,
  replacementValue: string,
  institution: string,
  typology: string,
  crestZone: string
}

export type ConstructionDto = {
  stories: string;
  structure: string;
  slab: string;
  foundation: string;
  constructionSurface: string;
  surfaceArea: string;
  date: string;
};

export type BasicInfoDto = {
  name: string,
  type: string,
  useOfProperty: string,
  sector: string,
  acronym: string,
  administration: string
}

export type LocationDto = {
  address: string,
  neighborhood: string,
  cp: string,
  state: string,
  stateCode: string,
  province: string,
  provinceCode: string,
  latitude: string,
  longitude: string
}
