import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SecurityDto } from 'src/services/accounts/dtos/security.dto'
import SecurityService from 'src/services/accounts/security.service'

export const useAddSecurities = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const saveSecurities = async (data: Partial<SecurityDto>[]) => {
    const security = await SecurityService.addSecurity(data, jwtToken)

    return security
  }

  return {
    saveSecurities
  }
}
