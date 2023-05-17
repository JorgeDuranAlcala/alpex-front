import { useState } from 'react'
import BrokeService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useUpdateById = () => {
  const [broker, setBroker] = useState<BrokerDto>()

  const update = (broker: Omit<BrokerDto, 'id'>) => {
    BrokeService.add(broker)
      .then(broker => {
        setBroker(broker)
      })
      .catch(error => {
        throw error
      })
  }

  return {
    update,
    broker
  }
}
