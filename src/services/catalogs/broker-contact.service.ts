import { BROKER_CONTACT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { BrokerContactDto } from 'src/services/catalogs/dtos/broker-contact.dto'

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
        `${BROKER_CONTACT_ROUTERS.UPDATE}${id}`,
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
}

export default new BrokerContactService()
