import { EndorsementDto } from '@/services/endorsement/dtos/Endorsement.dto'
import { useEffect, useState } from 'react'
import EndorsementService from 'src/services/endorsement/endorsement.service'

export const useFindEndorsementById = () => {
  const [endorsement, setEndorsement] = useState<EndorsementDto>()
  const [idEndorsement, setIdEndorsement] = useState<number>()

  useEffect(() => {
    idEndorsement &&
      EndorsementService.getById(idEndorsement)
        .then(endorsement => {
          setEndorsement(endorsement)
        })
        .catch((error: Error) => {
          throw error
        })
  }, [idEndorsement])

  return {
    endorsement,
    setIdEndorsement
  }
}
