import { SUBSCRIPTION_TYPE_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { SubscriptionTypeDto } from 'src/services/catalogs/dtos/SubscriptionType.dto'

class SubscriptionTypeService {
  async getAll(): Promise<SubscriptionTypeDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<SubscriptionTypeDto[]>>(SUBSCRIPTION_TYPE_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<SubscriptionTypeDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<SubscriptionTypeDto>>(
        `${SUBSCRIPTION_TYPE_ROUTERS.GET_BY_ID}/${id}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async add(subscriptionType: Partial<SubscriptionTypeDto>): Promise<SubscriptionTypeDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<SubscriptionTypeDto>>(`${SUBSCRIPTION_TYPE_ROUTERS.ADD}`, {
        ...subscriptionType
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<SubscriptionTypeDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<SubscriptionTypeDto>>(
        `${SUBSCRIPTION_TYPE_ROUTERS.UPDATE}/${id}`,
        {
          ...update
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: number) {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<SubscriptionTypeDto>>(
        `${SUBSCRIPTION_TYPE_ROUTERS.DELETE}/${id}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new SubscriptionTypeService()
