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
  totalBuildings: number | string
  name: string
  data: number[]
  categories: string[]
}


