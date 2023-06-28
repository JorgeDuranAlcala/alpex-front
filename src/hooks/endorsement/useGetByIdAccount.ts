import { EndorsementHistoryDto } from '@/services/endorsement/dtos/Endorsement.dto'
import { useEffect, useState } from 'react'
import EndorsementService from 'src/services/endorsement/endorsement.service'

export const useFindEndorsementsByIdAccount = () => {
  const [endorsements, setEndorsements] = useState<EndorsementHistoryDto[]>()
  const [idAccount, setIdAccount] = useState<number>()

  useEffect(() => {
    idAccount &&
      EndorsementService.getByIdAccount(idAccount)
        .then(endorsements => {
          setEndorsements(endorsements)
        })
        .catch((error: Error) => {
          throw error
        })
  }, [idAccount])

  return {
    endorsements,
    setIdAccount
  }
}
