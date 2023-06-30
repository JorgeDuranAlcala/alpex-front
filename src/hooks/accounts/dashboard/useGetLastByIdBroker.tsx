import { useEffect, useState } from 'react'

import { InformationResponse } from '@/services/accounts/dtos/information.dto'
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto'
import AccountServices from 'src/services/accounts/account.service'

export interface ResponseGetAccount {
  id: number
  informations: InformationResponse[]
  installments: InstallmentDto[]
  installmentsCount: number
}

export const useGetLastAccountByIdBroker = () => {
  const [account, setAccount] = useState<ResponseGetAccount>()
  const [brokerId, setBrokerId] = useState<number>(0)

  const getLastAccountByIdBroker = async (idBroker: number): Promise<ResponseGetAccount> => {
    const account = await AccountServices.getLastAccountByIdBroker(idBroker)

    return account
  }

  useEffect(() => {
    // if (brokerId) {
    AccountServices.getLastAccountByIdBroker(brokerId)
      .then(accounts => {
        setAccount(accounts)
      })
      .catch((error: Error) => {
        console.log(error)
      })

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brokerId])

  return {
    account,
    setBrokerId,
    getLastAccountByIdBroker,
    brokerId
  }
}
