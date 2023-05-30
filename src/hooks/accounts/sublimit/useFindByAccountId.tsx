import { useEffect, useState } from 'react'
import { SublimitDto } from 'src/services/accounts/dtos/sublimit.dto'
import SublimitService from 'src/services/accounts/sublimit.service'

export const useFindSublimitsByAccountId = (id?: number) => {
  const [sublimits, setSublimits] = useState<SublimitDto[]>()

  useEffect(() => {
    if (!id) return
    SublimitService.getAllByIdAccount(id)
      .then(sublimits => {
        setSublimits(sublimits)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [id])

  return {
    sublimits
  }
}
