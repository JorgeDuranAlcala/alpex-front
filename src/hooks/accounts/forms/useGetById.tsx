import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useEffect, useState } from 'react'

import { InformationDto } from '@/services/accounts/dtos/information.dto'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { SecurityTotalDto } from '@/services/accounts/dtos/securityTotal.dto'
import AccountServices from 'src/services/accounts/account.service'

interface Response {
  id: number
  informations: InformationDto[]
  securities: SecurityDto[]
  securityTotal: SecurityTotalDto
}

export const useGetAccountById = () => {
  const [account, setAccount] = useState<Response>()
  const [accountId, setAccountId] = useState<number | null>(null)
  const [jwtToken] = useLocalStorage('accessToken', false)
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
    setAccountId
  }
}
