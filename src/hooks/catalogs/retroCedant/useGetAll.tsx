import { useEffect, useState } from 'react'
import { RetroCedantDto } from 'src/services/catalogs/dtos/RetroCedantDto'
import RetroCedantService from 'src/services/catalogs/retroCedant.service'

export const useGetAllRetroCedants = () => {
  const [retroCedants, setRetroCedants] = useState<RetroCedantDto[]>()

  useEffect(() => {
    RetroCedantService.getAll()
      .then(retroCedants => {
        setRetroCedants(retroCedants)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { retroCedants }
}
