import { useState } from 'react'
import { SecurityDto } from 'src/services/accounts/dtos/security.dto'
import SecurityService from 'src/services/accounts/security.service'

export const useUpdateSecurities = () => {
  const [securities, setSecurities] = useState<SecurityDto[]>()

  const updateSecurities = (securitiesIn: Partial<SecurityDto>[]) => {
    SecurityService.update(securitiesIn)
      .then(securities => {
        setSecurities(securities)
      })
      .catch(error => {
        throw error
      })
  }

  return {
    updateSecurities,
    securities
  }
}
