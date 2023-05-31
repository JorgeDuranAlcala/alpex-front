import { useEffect, useState } from 'react'
import CedantService from 'src/services/catalogs/cedant.service'
import { CedantDto } from 'src/services/catalogs/dtos/cedant.dto'

export const useFindByIdCedant = () => {
  const [cedant, setCedant] = useState<CedantDto>()
  const [id, setId] = useState(0)

  useEffect(() => {
    console.log('useEffect usefIndByIdCedant')
    CedantService.findById(id)
      .then(cedant => {
        setCedant(cedant)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [id])

  return {
    cedant,
    setId
  }
}
