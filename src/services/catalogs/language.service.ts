import { LANGUAGE_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { LanguageDto } from 'src/services/catalogs/dtos/Language.dto'

class LanguageService {
  async getAll(): Promise<LanguageDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<LanguageDto[]>>(LANGUAGE_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<LanguageDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<LanguageDto>>(`${LANGUAGE_ROUTERS.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async add(language: Partial<LanguageDto>): Promise<LanguageDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<LanguageDto>>(`${LANGUAGE_ROUTERS.ADD}`, {
        ...language
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<LanguageDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<LanguageDto>>(`${LANGUAGE_ROUTERS.UPDATE}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: number) {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<LanguageDto>>(`${LANGUAGE_ROUTERS.DELETE}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new LanguageService()
