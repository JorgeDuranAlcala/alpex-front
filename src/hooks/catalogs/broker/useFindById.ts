import { useEffect, useState } from 'react'
import BrokeService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useFindByIdBroker = () => {
  const [broker, setBroker] = useState<BrokerDto>()
  const [id, setId] = useState(0)

  useEffect(() => {
    BrokeService.findById(id)
      .then(broker => {
        setBroker(broker)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [id])

  return {
    broker,
    setId
  }
}
