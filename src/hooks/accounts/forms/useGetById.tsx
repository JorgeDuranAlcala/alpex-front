import { useEffect, useState } from 'react'

import { InformationDto } from '@/services/accounts/dtos/information.dto'
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { SecurityTotalDto } from '@/services/accounts/dtos/securityTotal.dto'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import AccountServices from 'src/services/accounts/account.service'

export interface ResponseGetAccount {
  id: number
  informations: InformationDto[]
  securities: SecurityDto[]
  securityTotal: SecurityTotalDto
  installments: InstallmentDto[]
  sublimits: SublimitDto[]
}

export const useGetAccountById = () => {
  const [account, setAccount] = useState<ResponseGetAccount>()
  const [accountId, setAccountId] = useState<number | null>(null)

  const getAccountById = async (idAccount: number): Promise<ResponseGetAccount> => {
    const account = await AccountServices.getAccountById(idAccount)

    return account
  }

  useEffect(() => {
    if (accountId) {
      AccountServices.getAccountById(accountId)
        .then(accounts => {
          if (accounts) {
            accounts.securities =
              accounts.securities.length === 0
                ? [{ frontingFeeActive: false, isGross: false } as SecurityDto]
                : accounts.securities
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
