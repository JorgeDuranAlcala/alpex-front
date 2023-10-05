import { useEffect, useState } from 'react'

import installmentService from 'src/services/accounts/installments.service'

export interface ResponseGetInstallmentsByAccount {
  status: string
  id: number
  dueDate: Date
  balanceDue: string
  paymentsTotalAmount: number
  outstanding: number
  paymentHistory: Array<object>
  actions: Array<object>
  folders: Array<object>
  coments: Array<object>
  currency: string
}

export const useGetInstallmentsByIdAccount = () => {
  const [accountId, setInstallmenIdAccount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [installmentsAccount, setInstallmentsAccount] = useState<Array<ResponseGetInstallmentsByAccount> | null>(null)

  useEffect(() => {
    setIsLoading(true)
    if (accountId) {
      installmentService
        .getInstallmentByAccount(accountId)
        .then(installmentsAccount => {
          setInstallmentsAccount(installmentsAccount)
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
    installmentsAccount,
    setInstallmenIdAccount,
    accountId,
    setInstallmentsAccount
  }
}
