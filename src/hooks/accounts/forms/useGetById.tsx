import { useEffect, useState } from 'react'
import AccountServices from 'src/services/accounts/account.service'

export const useGetAccountById = (id: number) => {
  const [account, setAccount] = useState<any>()

  useEffect(() => {
    if (!id || account) return
    AccountServices.getAccountById(id)
      .then(accounts => {
        setAccount(accounts)
      })
      .catch((error: Error) => {
        throw error
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return {
    account
  }
}
