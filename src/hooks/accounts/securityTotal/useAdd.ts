import { SecurityTotalDto } from 'src/services/accounts/dtos/securityTotal.dto'
import SecurityTotalService from 'src/services/accounts/securityTotal.service'

export const useAddSecurityTotal = () => {
  const saveSecurityTotal = async (data: Partial<SecurityTotalDto>) => {
    const broker = await SecurityTotalService.addSecurityTotal(data)

    return broker
  }

  return {
    saveSecurityTotal
  }
}
