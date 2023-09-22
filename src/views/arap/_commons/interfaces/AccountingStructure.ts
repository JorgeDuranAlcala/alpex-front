export interface AccountingStructure {
  date: Date | string
  netPremiumReinsurance: number
  netPremium: number
  taxesAmount: number
  taxesPercent: number
  reinsuranceBrokerageAmount: number
  reinsuranceBrokeragePercent: number
  frontingFeeAmount: number
  frontingFeePercent: number
  discountsAmount: number
  discountsPercent: number
  dynamicCommissionAmount: number
  dynamicCommissionPercent: number
}
