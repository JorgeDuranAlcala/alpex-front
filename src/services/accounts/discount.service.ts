import { ACCOUNT_DISCOUNT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { DiscountDto } from './dtos/discount.dto'

class DiscountService {
  async createMany(discounts: Partial<DiscountDto[]>): Promise<DiscountDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<DiscountDto[]>>(ACCOUNT_DISCOUNT_ROUTERS.ADD, discounts)

      return data
    } catch (error) {
      throw error
    }
  }

  async getByAllIdAccount(idAccount: number): Promise<DiscountDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<DiscountDto[]>>(
        `${ACCOUNT_DISCOUNT_ROUTERS.GET_ALL}/${idAccount}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async updateMany(discounts: DiscountDto[]): Promise<DiscountDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<DiscountDto[]>>(
        `${ACCOUNT_DISCOUNT_ROUTERS.UPDATE}`,
        discounts
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: number): Promise<DiscountDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<DiscountDto[]>>(
        `${ACCOUNT_DISCOUNT_ROUTERS.DELETE}/${id}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new DiscountService()
