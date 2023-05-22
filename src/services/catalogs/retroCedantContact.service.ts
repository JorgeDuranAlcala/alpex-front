import { RETRO_CEDANT_CONTACT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { RetroCedantContactDto } from 'src/services/catalogs/dtos/retroCedantContact.dto'

class RetroCedantContactService {
  async getAll(): Promise<RetroCedantContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantContactDto[]>>(
        RETRO_CEDANT_CONTACT_ROUTES.GET_ALL
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<RetroCedantContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantContactDto>>(
        `${RETRO_CEDANT_CONTACT_ROUTES.GET_BY_ID}${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async add(contact: Partial<RetroCedantContactDto>): Promise<RetroCedantContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<RetroCedantContactDto>>(
        `${RETRO_CEDANT_CONTACT_ROUTES.ADD}`,
        {
          ...contact
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<RetroCedantContactDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<RetroCedantContactDto>>(
        `${RETRO_CEDANT_CONTACT_ROUTES.UPDATE}${id}`,
        {
          ...update
        }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findByIdRetroCedant(idRetroCedant: number): Promise<RetroCedantContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RetroCedantContactDto[]>>(
        `${RETRO_CEDANT_CONTACT_ROUTES.GET_BY_ID_RETROCEDANT}/${idRetroCedant}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new RetroCedantContactService()
