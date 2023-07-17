import { useEffect, useState } from 'react'
import AccountStatusService from 'src/services/catalogs/accountStatus.service'
import { AccountStatusDto } from 'src/services/catalogs/dtos/accountStatus.dto'

export const useGetAll = () => {
  const [accountStatus, setAccountStatus] = useState<AccountStatusDto[]>([])

  useEffect(() => {
    AccountStatusService.getAll()
      .then(status => {
        status.push({ id: 0, status: 'All accounts' })
        setAccountStatus(status)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return {
    accountStatus
  }
}
