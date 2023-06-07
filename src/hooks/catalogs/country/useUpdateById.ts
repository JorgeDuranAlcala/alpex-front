import CountryService from 'src/services/catalogs/country.service'
import { CountryDto } from 'src/services/catalogs/dtos/country.dto'

export const useUpdateById = () => {
  const update = async (id: number, country: Omit<CountryDto, 'id'>) => {
    const updateCountry = await CountryService.updateById(id, country)

    return updateCountry
  }

  return {
    update
  }
}
