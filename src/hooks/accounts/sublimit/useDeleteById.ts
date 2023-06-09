import { useState } from 'react'
import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useDeleteSublimits = () => {
  const [sublimits, setSublimits] = useState<SublimitDto[]>()

  const deleteSublimits = (sublimitsIn: Partial<SublimitDto>[]) => {
    SublimitService.delete(sublimitsIn)
      .then(sublimits => {
        setSublimits(sublimits)
      })
      .catch(error => {
        throw error
      })
  }

  return {
    deleteSublimits,
    sublimits
  }
}
