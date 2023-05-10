import { useEffect, useState } from 'react'
import { RetroCedantDto } from 'src/services/catalogs/dtos/RetroCedantDto'
import RetroCedantService from 'src/services/catalogs/retroCedant.service'

export const useGetRetroCedantById = (id: number) => {
  const [retroCedant, setRetroCedant] = useState<RetroCedantDto>()

  useEffect(() => {
    RetroCedantService.findById(id)
      .then(retroCedant => {
        setRetroCedant(retroCedant)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [id])

  return { retroCedant }
}
