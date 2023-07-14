import { useEffect, useState } from 'react'

import AccountStatusService from '@/services/catalogs/accountStatus.service'
import { AccountStatusDto } from '@/services/catalogs/dtos/accountStatus.dto'

export const useAccountStatusGetAll = () => {
  const [accountStatusList, setAccountStatusList] = useState<AccountStatusDto[]>([])

  useEffect(() => {
    AccountStatusService.getAll()
      .then(accountStatusList => {
        setAccountStatusList(accountStatusList)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return [accountStatusList]
}

export const useAccountStatusById = () => {
  const [acccountStatusId, setAccountStatusId] = useState<number>(0)
  const [accountStatus, setAccountStatus] = useState<AccountStatusDto>()

  useEffect(() => {
    acccountStatusId > 0 &&
      AccountStatusService.findById(acccountStatusId)
        .then(accountStatusDto => {
          setAccountStatus(accountStatusDto)
        })
        .catch(error => {
          throw new Error(error)
        })
  }, [acccountStatusId])

  return [accountStatus, setAccountStatusId]
}
