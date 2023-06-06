import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useAddSublimits = () => {
  const saveSublimits = async (data: Partial<SublimitDto>[]) => {
    const security = await SublimitService.addSublimits(data)

    return security
  }

  return {
    saveSublimits
  }
}
