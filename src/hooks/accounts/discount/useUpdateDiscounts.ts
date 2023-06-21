import { DiscountDto } from '@/services/accounts/dtos/discount.dto'
import DiscountService from 'src/services/accounts/discount.service'

export const useUpdateDiscounts = () => {
  const UpdateDiscounts = async (data: DiscountDto[]) => {
    await DiscountService.updateMany(data)
  }

  return {
    UpdateDiscounts
  }
}
