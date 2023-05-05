import CurrencyService from 'src/services/catalogs/currency.service'
import { CurrencyDto } from 'src/services/catalogs/dtos/CurrencyDto'

export const useUpdateCurrency = () => {
  const updateCurrency = async (id: number, update: Partial<CurrencyDto>) => {
    try {
      const resp = await CurrencyService.updateById(id, update)

      return resp
    } catch (error) {
      throw String(error)
    }
  }

  return { updateCurrency }
}
