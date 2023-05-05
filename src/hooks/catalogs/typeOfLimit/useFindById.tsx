import { useEffect, useState } from 'react'
import { TypeOfLimitDto } from 'src/services/catalogs/dtos/TypeOfLimitDto'
import TypeOfLimitService from 'src/services/catalogs/typeOfLimit.service'

export const useGetTypeOfLimitById = (id: number) => {
  const [typeOfLimit, setTypeOfLimit] = useState<TypeOfLimitDto>()

  useEffect(() => {
    TypeOfLimitService.findById(id)
      .then(typeOfLimit => {
        setTypeOfLimit(typeOfLimit)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [id])

  return { typeOfLimit }
}
