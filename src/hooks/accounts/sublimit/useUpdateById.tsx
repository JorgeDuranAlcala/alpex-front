import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useUpdateSublimits = () => {
  const updateSublimits = (sublimitsIn: Partial<SublimitDto>[]): Promise<SublimitDto[]> => {
    return SublimitService.update(sublimitsIn)
  }

  return {
    updateSublimits
  }
}
