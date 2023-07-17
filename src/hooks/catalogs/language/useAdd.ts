import { LanguageDto } from 'src/services/catalogs/dtos/Language.dto'
import LanguageService from 'src/services/catalogs/language.service'

export const useAddLanguage = () => {
  const saveLanguage = async (data: Omit<LanguageDto, 'id'>) => {
    const language = await LanguageService.add(data)

    return language
  }

  return {
    saveLanguage
  }
}
