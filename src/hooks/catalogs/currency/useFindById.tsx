import { useEffect, useState } from 'react'
import CurrencyService from 'src/services/catalogs/currency.service'
import { CurrencyDto } from 'src/services/catalogs/dtos/CurrencyDto'

export const useGetCurrencyById = (id: number) => {
  const [currency, setCurrency] = useState<CurrencyDto>()

  useEffect(() => {
    CurrencyService.findById(id)
      .then(currency => {
        setCurrency(currency)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [id])

  return { currency }
}
