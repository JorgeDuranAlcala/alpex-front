import { AccountingStructure } from '../_commons/interfaces/AccountingStructure'

export const accounting_structure_mock: AccountingStructure = {
  date: new Date().toISOString(),
  netPremiumReinsurance: 1_000_000,
  netPremium: 1_000_000,
  taxesAmount: 45,
  taxesPercent: 5,
  reinsuranceBrokerageAmount: 60,
  reinsuranceBrokeragePercent: 10,
  frontingFeeAmount: 55,
  frontingFeePercent: 4,
  discountsAmount: 890,
  discountsPercent: 90,
  dynamicCommissionAmount: 200,
  dynamicCommissionPercent: 2
}
