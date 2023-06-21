import DiscountService from 'src/services/accounts/discount.service'

export const useDeleteDiscountsById = () => {
  const deleteDiscountsById = async (id: number) => {
    await DiscountService.deleteById(id)
  }

  return {
    deleteDiscountsById
  }
}
