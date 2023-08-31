export interface idCCoverageI {
  active: boolean
  coverage: string
  createdAt: string
  id: number
  special: boolean
  updatedAt: string
}

export interface SublimitDto {
  id: number | undefined
  sublimit: number
  at100: boolean
  yes: boolean
  luc: boolean
  typeDeductible: string
  deductible: number | null
  amount: number | null
  min: number | null
  active: boolean | null
  typeBi: string
  amountBi: number | null
  daysBi: number | null
  coinsurance: number
  idCCoverage?: number | null | idCCoverageI | any
  idCDeductiblePer: number | null
  title: string
  idAccount: number
}
