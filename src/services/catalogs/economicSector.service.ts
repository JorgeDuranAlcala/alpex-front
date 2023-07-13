import { ECONOMIC_SECTOR_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { EconomicSectorDto } from 'src/services/catalogs/dtos/economicSector.dto'

class BrokerContactService {
  async getAll(): Promise<EconomicSectorDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<EconomicSectorDto[]>>(ECONOMIC_SECTOR_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new BrokerContactService()
