import { useEffect, useState } from 'react'
import AccountTypeService from 'src/services/catalogs/accountType.service'
import { AccountTypeDto } from 'src/services/catalogs/dtos/accountType.dto'

export const useGetAll = () => {
  const [accountTypes, setAccountTypes] = useState<AccountTypeDto[]>([])

  useEffect(() => {
    AccountTypeService.getAll()
      .then(brokers => {
        setAccountTypes(brokers)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return {
    accountTypes
  }
}
