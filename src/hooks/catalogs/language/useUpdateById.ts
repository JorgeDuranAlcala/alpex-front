import { LanguageDto } from 'src/services/catalogs/dtos/Language.dto'
import LanguageService from 'src/services/catalogs/language.service'

export const useUpdateById = () => {
  const update = async (id: number, language: Omit<LanguageDto, 'id'>) => {
    const updateLanguage = await LanguageService.updateById(id, language)

    return updateLanguage
  }

  return {
    update
  }
}
