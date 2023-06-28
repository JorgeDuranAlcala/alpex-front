import { ENDORSEMENT_ROUTES } from '@/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { EndorsementDto, EndorsementHistoryDto } from './dtos/Endorsement.dto'

class EndorsementService {
  async getById(id: number): Promise<EndorsementDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<EndorsementDto>>(`${ENDORSEMENT_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getByIdAccount(idAccount: number): Promise<EndorsementHistoryDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<EndorsementHistoryDto[]>>(
        `${ENDORSEMENT_ROUTES.GET_BY_ID_ACCOUNT}/${idAccount}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new EndorsementService()
