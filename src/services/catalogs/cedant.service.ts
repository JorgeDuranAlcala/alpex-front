import { BROKER_ROUTES } from '@/configs/api'
import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { CedantDto } from '@/services/catalogs/dtos/cedant.dto'

class BrokerService {
  async getAll(): Promise<CedantDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantDto[]>>(BROKER_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<CedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantDto>>(`${BROKER_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addBroker(broker: CedantDto): Promise<CedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CedantDto>>(`${BROKER_ROUTES.ADD}`, {
        ...broker
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<CedantDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CedantDto>>(`${BROKER_ROUTES.UPDATE}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new BrokerService()
