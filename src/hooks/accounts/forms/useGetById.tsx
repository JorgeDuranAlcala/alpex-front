import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import AccountServices from 'src/services/accounts/account.service'

export const useGetAccountById = () => {
  const [account, setAccount] = useState<any>()
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
