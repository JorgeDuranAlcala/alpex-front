import { useEffect, useState } from 'react'

import { InformationDetailsDto } from '@/services/accounts/dtos/information.dto'
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { SecurityTotalDto } from '@/services/accounts/dtos/securityTotal.dto'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import AccountServices from 'src/services/accounts/account.service'

export interface ResponseGetAccount {
  id: number
  idAccountStatus: number
  status: string
  idAccountType: number
  informations: InformationDetailsDto[] //InformationDto[] //
  securities: SecurityDto[]
  securitiesTotal: SecurityTotalDto[]
  installments: InstallmentDto[]
  sublimits: SublimitDto[]
}

//TODO
const account_status = {
  status_1: 'PENDING',
  status_2: 'NOT_TAKEN_UP',
  status_3: 'NOT_MATERIALIZED',
  status_4: 'DECLINED',
  status_5: 'BOUND'
}

export const useGetAccountById = () => {
  const [account, setAccount] = useState<ResponseGetAccount>()
  const [accountId, setAccountId] = useState<number | null>(null)

  const getAccountById = async (idAccount: number): Promise<ResponseGetAccount> => {
    console.log('getAccountById', idAccount)
    const getAccount = await AccountServices.getAccountById(idAccount)
    if (getAccount) {
      const idAccountStatus: number = getAccount.idAccountStatus as number
      const statusKey = `status_${idAccountStatus}`
      getAccount.status = account_status[statusKey as keyof typeof account_status]
      setAccount(getAccount)
    }

    return getAccount
  }

  useEffect(() => {
    if (accountId) {

      console.log('useGetAccountById', accountId)
      AccountServices.getAccountById(accountId)
        .then(accounts => {
          if (accounts) {
            accounts.securities = accounts.securities as SecurityDto[]
            const idAccountStatus: number = accounts.idAccountStatus as number
            const statusKey = `status_${idAccountStatus}`
            accounts.status = account_status[statusKey as keyof typeof account_status]
          }
          setAccount(accounts)
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId])

  return {
    account,
    setAccountId,
    getAccountById,
    accountId
  }
}
