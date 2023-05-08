import CedantService from '@/services/catalogs/cedant.service'
import { CedantDto } from '@/services/catalogs/dtos/cedant.dto'
import { useEffect, useState } from 'react'

export const useGetAll = () => {
  const [cedant, setCedant] = useState<CedantDto[]>()

  useEffect(() => {
    CedantService.getAll()
      .then(cedants => {
        setCedant(cedants)
      })
      .catch(error => {
        throw error
      })
  }, [])

  return {
    cedant
  }
}
