import { useEffect, useState } from 'react'
import { EndorsementTypeDto } from 'src/services/catalogs/dtos/EndorsementType.dto'
import EndorsementTypeService from 'src/services/catalogs/endorsementType.service'

export const useGetAllEndorsementTypes = () => {
  const [endorsementTypes, setEndorsementTypes] = useState<EndorsementTypeDto[]>()

  useEffect(() => {
    EndorsementTypeService.getAll()
      .then(endorsementTypeData => {
        setEndorsementTypes(endorsementTypeData)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { endorsementTypes }
}
