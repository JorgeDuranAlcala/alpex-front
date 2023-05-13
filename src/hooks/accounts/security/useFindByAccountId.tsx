import { useEffect, useState } from 'react'
import { SecurityDto } from 'src/services/accounts/dtos/security.dto'
import SecurityService from 'src/services/accounts/security.service'

export const useFindSecuritiesByAccountId = (id: number) => {
  const [securities, setSecurities] = useState<SecurityDto[]>()

  useEffect(() => {
    SecurityService.getByAllIdAccount(id)
      .then(securities => {
        setSecurities(securities)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [id])

  return {
    securities
  }
}
