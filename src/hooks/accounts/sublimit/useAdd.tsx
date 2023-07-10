import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useAddSublimits = () => {
  const saveSublimits = (data: Partial<SublimitDto>[]): Promise<SublimitDto[]> => {
    return SublimitService.addSublimits(data)
  }

  return {
    saveSublimits
  }
}
