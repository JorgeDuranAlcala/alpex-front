import { useEffect, useState } from 'react'
import CurrencyService from 'src/services/catalogs/currency.service'
import { CurrencyDto } from 'src/services/catalogs/dtos/CurrencyDto'

export const useGetAllCurrencies = () => {
  const [currencies, setCurrencies] = useState<CurrencyDto[]>([])

  useEffect(() => {
    CurrencyService.getAll()
      .then(currencies => {
        setCurrencies(currencies)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { currencies }
}
