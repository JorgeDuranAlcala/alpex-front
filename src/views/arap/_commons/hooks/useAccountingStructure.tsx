import { useState } from 'react'
import { accounting_structure_mock } from '../../mocks/accounting_structure_mock'
import { AccountingStructure } from '../interfaces/AccountingStructure'

const initial_accounting_structure: AccountingStructure = {
  date: new Date().toISOString(),
  netPremiumReinsurance: 0,
  netPremium: 0,
  taxesAmount: 0,
  taxesPercent: 0,
  reinsuranceBrokerageAmount: 0,
  reinsuranceBrokeragePercent: 0,
  frontingFeeAmount: 0,
  frontingFeePercent: 0,
  discountsAmount: 0,
  discountsPercent: 0,
  dynamicCommissionAmount: 0,
  dynamicCommissionPercent: 0
}

export const useAccountingStructure = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [accountingStructure, setAccountingStructure] = useState<AccountingStructure>(initial_accounting_structure)

  const getDataByInsuredId = (insuredId: number) => {
    setIsLoading(true)

    console.log(insuredId)

    // Todo: usar insuredId;
    // Todo: reemplazar este timeout por el servicio que se implementará
    setTimeout(() => {
      setAccountingStructure(accounting_structure_mock)
      setIsLoading(false)
    }, 1000)
  }

  return {
    isLoading,
    accountingStructure,
    getDataByInsuredId
  }
}
