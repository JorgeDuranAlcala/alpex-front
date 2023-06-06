import { useEffect, useState } from 'react'
import CurrencyService from 'src/services/catalogs/currency.service'
import { CurrencyDto } from 'src/services/catalogs/dtos/CurrencyDto'

export const useGetAllCurrencies = () => {
  const [currencies, setCurrencies] = useState<CurrencyDto[]>([])

  const getAllCurrencies = async () => {
    const data = await CurrencyService.getAll()
    setCurrencies(data)
  }

  useEffect(() => {
    /*  CurrencyService.getAll()
      .then(currencies => {
        setCurrencies(currencies)
      })
      .catch(error => {
        throw new Error(error)
      }) */
    getAllCurrencies()
  }, [])

  return { currencies, getAllCurrencies }
}
