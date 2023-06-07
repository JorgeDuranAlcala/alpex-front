import { useEffect, useState } from 'react'
import CountryService from 'src/services/catalogs/country.service'
import { CountryDto } from 'src/services/catalogs/dtos/country.dto'

export const useGetAllCountries = () => {
  const [countries, setCountry] = useState<CountryDto[]>([])

  const getAllCountries = async () => {
    const data = await CountryService.getAll()
    setCountry(data)
  }

  useEffect(() => {
    /* CountryService.getAll()
      .then(countries => {
        setCountry(countries)
      })
      .catch(error => {
        throw error
      }) */
    getAllCountries()
  }, [])

  return {
    countries,
    getAllCountries
  }
}
