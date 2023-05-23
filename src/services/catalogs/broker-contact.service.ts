import { IBrokerContactsState } from '@/types/apps/catalogs/brokerContactTypes'
import { BROKER_CONTACT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { BrokerContactDto, BrokerContactsDeleteDto } from 'src/services/catalogs/dtos/broker-contact.dto'
import { queryBuilder } from '../helper/queryBuilder'

class BrokerContactService {
  async getAll(): Promise<BrokerContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerContactDto[]>>(BROKER_CONTACT_ROUTERS.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<BrokerContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerContactDto>>(
        `${BROKER_CONTACT_ROUTERS.GET_BY_ID}${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async add(contact: Partial<BrokerContactDto>): Promise<BrokerContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<BrokerContactDto>>(`${BROKER_CONTACT_ROUTERS.ADD}`, {
        ...contact
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<BrokerContactDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<BrokerContactDto>>(
        `${BROKER_CONTACT_ROUTERS.UPDATE}/${id}`,
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

  async findByIdBroker(idBroker: number): Promise<BrokerContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BrokerContactDto[]>>(
        `${BROKER_CONTACT_ROUTERS.GET_BY_ID_BROKER}/${idBroker}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async getBrokerContactsByIdBroker(idCBroker: number, brokerContactsData: IBrokerContactsState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(brokerContactsData.filters, `${BROKER_CONTACT_ROUTERS.GET}/${idCBroker}`)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${brokerContactsData.info.take}&page=${brokerContactsData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async deleteBrokerContacts(brokerContactsDelete: Partial<BrokerContactsDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(BROKER_CONTACT_ROUTERS.DELETE, {
        ...brokerContactsDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new BrokerContactService()
