export interface SecurityDto {
  id: number
  netPremiumat100: number
  share: number | null
  frontingFeeActive: boolean | null
  dynamicCommission: number
  frontingFee: number
  netReinsurancepremium: number
  taxes: number
  reinsuranceBrokerage: number
  receivedNetPremium: number
  distributedNetPremium: number
  difference: number
  active: boolean | null
  idCReinsuranceCompany: number
  idCRetroCedant: number
  idCRetroCedantContact: number
  idEndorsement: number
  idAccount: number
}
