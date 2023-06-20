import { DiscountDto } from '@/services/accounts/dtos/discount.dto'
import DiscountService from 'src/services/accounts/discount.service'

export const useAddDiscounts = () => {
  const addDiscounts = async (data: Partial<DiscountDto[]>) => {
    await DiscountService.createMany(data)
  }

  return {
    addDiscounts
  }
}
