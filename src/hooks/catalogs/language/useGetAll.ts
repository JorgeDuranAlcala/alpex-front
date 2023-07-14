import { useEffect, useState } from 'react'
import { LanguageDto } from 'src/services/catalogs/dtos/Language.dto'
import LanguageService from 'src/services/catalogs/language.service'

export const useGetAllLanguage = () => {
  const [languages, setLanguage] = useState<LanguageDto[]>([])

  const getAllLanguage = async () => {
    const data = await LanguageService.getAll()
    setLanguage(data)
  }

  useEffect(() => {
    getAllLanguage()
  }, [])

  return {
    languages,
    getAllLanguage
  }
}
