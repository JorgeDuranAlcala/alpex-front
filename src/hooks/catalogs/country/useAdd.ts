import CountryService from 'src/services/catalogs/country.service'
import { CountryDto } from 'src/services/catalogs/dtos/country.dto'

export const useAddCountry = () => {
  const saveCountry = async (data: Omit<CountryDto, 'id'>) => {
    const country = await CountryService.add(data)

    return country
  }

  return {
    saveCountry
  }
}
