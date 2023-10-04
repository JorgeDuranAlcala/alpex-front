import { useEffect, useState } from 'react'

import installmentService from 'src/services/accounts/installments.service'

export interface ResponseGetAccount {
  insured: string
  idAccount: number
  status: string
  broker: string
  lineOfBusiness: string
  dueDate: string
  balanceDue: number
  installmentOrder: string
  balance: number
  totalDebt: number
}

export const useGetBrokerAccount = () => {
  const [actualInstallment, setActualInstallment] = useState<ResponseGetAccount>()
  const [accountId, setAccountIdInstallment] = useState<number | null>(null)
  const [installmentId, setInstallmentId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (accountId && installmentId) {
      installmentService
        .installmentHeader(accountId, installmentId)
        .then(actualInstallments => {
          setActualInstallment(actualInstallments)
          setIsLoading(false)
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId])

  return {
    isLoading,
    actualInstallment,
    setAccountIdInstallment,
    accountId,
    setActualInstallment,
    installmentId,
    setInstallmentId
  }
}
