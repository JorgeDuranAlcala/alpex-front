import { EndorsementDto } from '@/services/endorsement/dtos/Endorsement.dto'
import EndorsementService from 'src/services/endorsement/endorsement.service'

export const useAddEndorsement = () => {
  const addEndorsement = async (newEndorsement: EndorsementDto) => {
    const response = await EndorsementService.create(newEndorsement)

    return response
  }

  return {
    addEndorsement
  }
}
