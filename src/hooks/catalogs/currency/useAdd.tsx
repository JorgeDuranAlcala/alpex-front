import CurrencyService from 'src/services/catalogs/currency.service'
import { CurrencyDto } from 'src/services/catalogs/dtos/CurrencyDto'

export const useAddCurrency = () => {
  const addCurrency = async (currencyAdd: Omit<CurrencyDto, 'id'>) => {
    try {
      const resp = await CurrencyService.addCurrency(currencyAdd)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { addCurrency }
}
