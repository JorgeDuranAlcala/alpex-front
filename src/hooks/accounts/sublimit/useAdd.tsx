import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useAddSublimits = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const saveSublimits = async (data: Partial<SublimitDto>[]) => {
    const security = await SublimitService.addSublimits(data, jwtToken)

    return security
  }

  return {
    saveSublimits
  }
}
