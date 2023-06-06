import { COUNTRY_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { CountryDto } from 'src/services/catalogs/dtos/country.dto'

class CountryService {
  async getAll(): Promise<CountryDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CountryDto[]>>(COUNTRY_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<CountryDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CountryDto>>(`${COUNTRY_ROUTERS.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async add(country: Partial<CountryDto>): Promise<CountryDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CountryDto>>(`${COUNTRY_ROUTERS.ADD}`, {
        ...country
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<CountryDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CountryDto>>(`${COUNTRY_ROUTERS.UPDATE}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: number) {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<CountryDto>>(`${COUNTRY_ROUTERS.DELETE}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CountryService()
