import { SecurityDto } from 'src/services/accounts/dtos/security.dto'
import SecurityService from 'src/services/accounts/security.service'

export const useAddSecurities = () => {
  const saveSecurities = async (data: Partial<{ idAccount: number; securities: Partial<SecurityDto>[] }>) => {
    const security = await SecurityService.addSecurity(data)

    return security
  }

  return {
    saveSecurities
  }
}
