export interface SublimitDto {
  id: number
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
  idCCoverage: number | null
  idCDeductiblePer: number | null
  idEndorsement: number | null
  title: string
  idAccount: number
}
