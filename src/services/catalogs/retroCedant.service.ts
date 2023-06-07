import { RETRO_CEDANT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'
import { RetroCedantDto, RetroCedantsDeleteDto, RetroCedantsPaginationDto } from './dtos/RetroCedantDto'

class RetroCedantService {
  async getAll(): Promise<RetroCedantDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantDto[]>>(RETRO_CEDANT_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<RetroCedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantDto>>(`${RETRO_CEDANT_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addRetroCedant(retroCedant: Partial<RetroCedantDto>): Promise<RetroCedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<RetroCedantDto>>(RETRO_CEDANT_ROUTES.ADD, {
        ...retroCedant
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<RetroCedantDto>): Promise<RetroCedantDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<RetroCedantDto>>(`${RETRO_CEDANT_ROUTES.GET_BY_ID}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async deleteRetroCedants(retroCedantsDelete: Partial<RetroCedantsDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(RETRO_CEDANT_ROUTES.DELETE, {
        ...retroCedantsDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async getRetroCedantsPagination(retroCedantData: RetroCedantsPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(retroCedantData.filters, `${RETRO_CEDANT_ROUTES.GET}`)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${retroCedantData.info.take}&page=${retroCedantData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default new RetroCedantService()
