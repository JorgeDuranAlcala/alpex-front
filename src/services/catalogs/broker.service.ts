import { BROKER_ROUTES } from '@/configs/api'
import { AppAlpexApiGateWay } from '@/services/app.alpex.api-getway'
import { BrokerDto } from '@/services/catalogs/dtos/broker.dto'

class BrokerService {
  async getAll(): Promise<BrokerDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerDto[]>>(BROKER_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<BrokerDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerDto>>(`${BROKER_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async add(broker: Partial<BrokerDto>): Promise<BrokerDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<BrokerDto>>(`${BROKER_ROUTES.ADD}`, {
        ...broker
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<BrokerDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<BrokerDto>>(`${BROKER_ROUTES.UPDATE}/${id}`, {
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
