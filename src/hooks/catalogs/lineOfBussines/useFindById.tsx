import { useEffect, useState } from 'react'
import { LineOfBussinesDto } from 'src/services/catalogs/dtos/LineOfBussinesDto'
import LineOfBussinesService from 'src/services/catalogs/lineOfBussines.service'

export const useGetLineOfBussinesById = (id: number) => {
  const [lineOfBussinesById, setLineOfBussinesById] = useState<LineOfBussinesDto>()

  useEffect(() => {
    LineOfBussinesService.findById(id)
      .then(lineOfBussines => {
        setLineOfBussinesById(lineOfBussines)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [id])

  return { lineOfBussinesById }
}
