//Dtos
import { IBroker } from 'src/views/catalogues/dynamic/broker-table'

/**
 * clase encargada de los servicios de Brokers
 */

class BrokersServices {
  async getBrokerList() {
    const data: IBroker[] = []

    for (let index = 1; index <= 200; index++) {
      const id = index.toString().padStart(4, '0')
      const name = `Broker ${index}`

      data.push({
        id,
        name
      })
    }

    return data
  }
}
export default new BrokersServices()


