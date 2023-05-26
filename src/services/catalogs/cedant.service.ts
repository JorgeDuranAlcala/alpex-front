import { CEDANT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { CedantDto, CedantsDeleteDto, CedantsPaginationDto } from 'src/services/catalogs/dtos/cedant.dto'
import { queryBuilder } from '../helper/queryBuilder'

class CedantService {
  async getAll(): Promise<CedantDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantDto[]>>(CEDANT_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<CedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantDto>>(`${CEDANT_ROUTERS.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async add(cedant: Partial<CedantDto>): Promise<CedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CedantDto>>(`${CEDANT_ROUTERS.ADD}`, {
        ...cedant
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<CedantDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CedantDto>>(`${CEDANT_ROUTERS.UPDATE}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteCedants(cedantsDelete: Partial<CedantsDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(CEDANT_ROUTERS.DELETE, {
        ...cedantsDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async getCedantsPagination(cedantData: CedantsPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(cedantData.filters, `${CEDANT_ROUTERS.GET}`)
      const { data } = await AppAlpexApiGateWay.get(`${url}&take=${cedantData.info.take}&page=${cedantData.info.page}`)

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default new CedantService()
