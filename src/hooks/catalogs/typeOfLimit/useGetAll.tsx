import { useEffect, useState } from 'react'
import { TypeOfLimitDto } from 'src/services/catalogs/dtos/TypeOfLimitDto'
import TypeOfLimitService from 'src/services/catalogs/typeOfLimit.service'

export const useGetAllTypeOfLimit = () => {
  const [typesOfLimits, setTypeOfLimit] = useState<TypeOfLimitDto[]>([])

  const getAllTypeOfLimit = async () => {
    const data = await TypeOfLimitService.getAll()
    setTypeOfLimit(data)
  }

  useEffect(() => {
    TypeOfLimitService.getAll()
      .then(typesOfLimits => {
        setTypeOfLimit(typesOfLimits)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { typesOfLimits, getAllTypeOfLimit }
}
