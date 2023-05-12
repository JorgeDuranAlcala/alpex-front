import { useState } from 'react'
import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useUpdateSublimits = () => {
  const [sublimits, setSublimits] = useState<SublimitDto[]>()

  const updateSublimits = (sublimitsIn: Partial<SublimitDto>[]) => {
    SublimitService.update(sublimitsIn)
      .then(sublimits => {
        setSublimits(sublimits)
      })
      .catch(error => {
        throw error
      })
  }

  return {
    updateSublimits,
    sublimits
  }
}
