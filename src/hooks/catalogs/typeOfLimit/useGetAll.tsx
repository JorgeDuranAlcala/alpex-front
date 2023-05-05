import { useEffect, useState } from 'react'
import { TypeOfLimitDto } from 'src/services/catalogs/dtos/typeOfLimitDto'
import TypeOfLimitService from 'src/services/catalogs/typeOfLimit.service'

export const useGetAllTypeOfLimit = () => {
  const [typesOfLimits, setTypeOfLimit] = useState<TypeOfLimitDto[]>()

  useEffect(() => {
    TypeOfLimitService.getAll()
      .then(typesOfLimits => {
        setTypeOfLimit(typesOfLimits)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { typesOfLimits }
}
