import { useEffect, useState } from 'react'
import CountryService from 'src/services/catalogs/country.service'
import { CountryDto } from 'src/services/catalogs/dtos/country.dto'

export const useGetAllCountries = () => {
  const [countries, setCountry] = useState<CountryDto[]>([])

  useEffect(() => {
    CountryService.getAll()
      .then(countries => {
        setCountry(countries)
      })
      .catch(error => {
        throw error
      })
  }, [])

  return {
    countries
  }
}
