import { useState } from 'react'
import DiscountService from 'src/services/accounts/discount.service'
import { DiscountDto } from 'src/services/accounts/dtos/discount.dto'

export const useGetDiscountByIdAccount = () => {
  const [discounts, setDiscounts] = useState<DiscountDto[]>([])

  const getDiscounts = async (idAccount: number) => {
    const response = await DiscountService.getByAllIdAccount(idAccount)
    setDiscounts(() => {
      const newState = [...response]

      return newState
    })

    return response
  }

  return {
    getDiscounts,
    setDiscounts,
    discounts
  }
}
