import LanguageService from '@/services/catalogs/language.service'

export const useDeleteLanguage = () => {
  const deleteLanguage = async (id: number) => {
    const deleteLanguageById = await LanguageService.deleteById(id)

    return deleteLanguageById
  }

  return {
    deleteLanguage
  }
}
