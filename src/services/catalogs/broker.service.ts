import { IBrokersState } from '@/types/apps/catalogs/brokerTypes'
import { BROKER_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { BrokerDto, BrokersDeleteDto } from 'src/services/catalogs/dtos/broker.dto'
import { queryBuilder } from '../helper/queryBuilder'

class BrokeService {
  async getAll(): Promise<BrokerDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerDto[]>>(BROKER_ROUTES.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<BrokerDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerDto>>(`${BROKER_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
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
      throw error
    }
  }

  async getBrokers(brokersData: IBrokersState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(brokersData.filters, BROKER_ROUTES.GET)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${brokersData.info.take}&page=${brokersData.info.page}`
      )
      console.log({ data })

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async deleteBrokers(brokersDelete: Partial<BrokersDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(BROKER_ROUTES.DELETE, {
        ...brokersDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new BrokeService()
