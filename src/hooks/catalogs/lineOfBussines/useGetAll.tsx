import { useEffect, useState } from 'react'
import { LineOfBussinesDto } from 'src/services/catalogs/dtos/LineOfBussinesDto'
import LineOfBussinesService from 'src/services/catalogs/lineOfBussines.service'

export const useGetAllLineOfBussines = () => {
  const [lineOfBussines, setLineOfBussines] = useState<LineOfBussinesDto[]>()

  useEffect(() => {
    LineOfBussinesService.getAll()
      .then(lineOfBussines => {
        setLineOfBussines(lineOfBussines)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { lineOfBussines }
}
