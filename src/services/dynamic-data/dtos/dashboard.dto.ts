// import { ApexOptions } from 'apexcharts'

export interface TotalInvestmentDto {
  total: number | string
  differencePercentage: number | string
  trend: string
}

export interface ProportionInvestmentDto {
  invested: number | string
  avaliable: number | string
}

export interface SalesThisMonthDto {
  total: number | string
  data: number[]

}

export interface InvestmentPerStateDto {
  totalValfis: number | string
  name: string
  data: number[]
  categories: string[]
}

export interface IProperty {
  id: string
  valfis: string
  nomEnt: string
  nomMun: string
  type: string
  zonacresta: string
}

export interface IEarthquakeDetailDto{
  magnitude: string
  depth: string
  epicenter: string
  coordinatesCenter: string
  dateTime: string
}
