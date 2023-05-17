import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SecurityTotalDto } from 'src/services/accounts/dtos/securityTotal.dto'
import SecurityTotalService from 'src/services/accounts/securityTotal.service'

export const useAddSecurityTotal = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const saveSecurityTotal = async (data: Partial<SecurityTotalDto>) => {
    const broker = await SecurityTotalService.addSecurityTotal(data, jwtToken)

    return broker
  }

  return {
    saveSecurityTotal
  }
}
