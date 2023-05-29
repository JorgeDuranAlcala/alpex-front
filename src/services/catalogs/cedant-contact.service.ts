import {
  CedantContactDto,
  CedantContactsDeleteDto,
  CedantContactsPaginationDto
} from '@/services/catalogs/dtos/cedant-contact.dto'
import { CEDANT_CONTACT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'

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

  async findByIdCedant(idCedant: number): Promise<CedantContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CedantContactDto[]>>(
        `${CEDANT_CONTACT_ROUTERS.GET_BY_ID_CEDANT}/${idCedant}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async getCedantContactsByIdCedant(idCCedant: number, cedantContactsData: CedantContactsPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(cedantContactsData.filters, `${CEDANT_CONTACT_ROUTERS.GET}/${idCCedant}`)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${cedantContactsData.info.take}&page=${cedantContactsData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async deleteCedantContacts(cedantContactsDelete: Partial<CedantContactsDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(CEDANT_CONTACT_ROUTERS.DELETE, {
        ...cedantContactsDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CedantContactService()
