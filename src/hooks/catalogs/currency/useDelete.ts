import CurrencyService from '@/services/catalogs/currency.service'

export const useDeleteCurrency = () => {
  const deleteCurrency = async (id: number) => {
    const deleteCurrencyById = await CurrencyService.deleteById(id)

    return deleteCurrencyById
  }

  return {
    deleteCurrency
  }
}
