import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useEffect, useState } from 'react'

import { InformationDto } from '@/services/accounts/dtos/information.dto'
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { SecurityTotalDto } from '@/services/accounts/dtos/securityTotal.dto'
import AccountServices from 'src/services/accounts/account.service'

interface Response {
  id: number
  informations: InformationDto[]
  securities: SecurityDto[]
  securityTotal: SecurityTotalDto
  installments: InstallmentDto[]
}

export const useGetAccountById = () => {
  const [account, setAccount] = useState<Response>()
  const [accountId, setAccountId] = useState<number | null>(null)
  const [jwtToken] = useLocalStorage('accessToken', false)

  const getAccountById = async (idAccount: number): Promise<Response> => {
    const token = localStorage.getItem('accessToken')
    const account = await AccountServices.getAccountById(idAccount, jwtToken ?? token)

    return account
  }

  useEffect(() => {
    if (accountId) {
      AccountServices.getAccountById(accountId, jwtToken)
        .then(accounts => {
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
    getAccountById
  }
}
