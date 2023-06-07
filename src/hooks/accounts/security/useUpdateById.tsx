import { useState } from 'react'
import { SecurityDto } from 'src/services/accounts/dtos/security.dto'
import SecurityService from 'src/services/accounts/security.service'

export const useUpdateSecurities = () => {
  const [securities, setSecurities] = useState<SecurityDto[]>()

  const updateSecurities = async (securitiesIn: Partial<SecurityDto>[]) => {
    return await SecurityService.update(securitiesIn)
  }

  return {
    updateSecurities,
    securities
  }
}
