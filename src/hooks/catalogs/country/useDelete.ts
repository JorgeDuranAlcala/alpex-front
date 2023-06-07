import CountryService from '@/services/catalogs/country.service'

export const useDeleteCountry = () => {
  const deleteCountry = async (id: number) => {
    const deleteCountryById = await CountryService.deleteById(id)

    return deleteCountryById
  }

  return {
    deleteCountry
  }
}
