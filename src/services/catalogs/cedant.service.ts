import { BROKER_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { CedantDto } from 'src/services/catalogs/dtos/cedant.dto'

class BrokerService {
  async getAll(): Promise<CedantDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantDto[]>>(BROKER_ROUTES.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<CedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantDto>>(`${BROKER_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async add(cedant: Partial<CedantDto>): Promise<CedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CedantDto>>(`${BROKER_ROUTES.ADD}`, {
        ...cedant
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<CedantDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CedantDto>>(`${BROKER_ROUTES.UPDATE}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new BrokerService()
