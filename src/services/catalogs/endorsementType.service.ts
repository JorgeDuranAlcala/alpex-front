import { ENDORSEMENT_TYPE_ROUTES } from '@/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { EndorsementTypeDto } from './dtos/EndorsementType.dto'

class EndorsementTypeService {
  async getAll(): Promise<EndorsementTypeDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<EndorsementTypeDto[]>>(ENDORSEMENT_TYPE_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new EndorsementTypeService()
