import { CedantContactDto } from '@/services/catalogs/dtos/cedant-contact.dto'
import { CEDANT_CONTACT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'

class CedantContactService {
  async getAll(): Promise<CedantContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantContactDto[]>>(CEDANT_CONTACT_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<CedantContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantContactDto>>(
        `${CEDANT_CONTACT_ROUTERS.GET_BY_ID}${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async add(contact: Partial<CedantContactDto>): Promise<CedantContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CedantContactDto>>(`${CEDANT_CONTACT_ROUTERS.ADD}`, {
        ...contact
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<CedantContactDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<CedantContactDto>>(
        `${CEDANT_CONTACT_ROUTERS.UPDATE}${id}`,
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

  async findByIdCedant(idBroker: number): Promise<CedantContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantContactDto[]>>(
        `${CEDANT_CONTACT_ROUTERS.GET_BY_ID_CEDANT}/${idBroker}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CedantContactService()
