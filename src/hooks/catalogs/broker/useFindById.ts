import { useEffect, useState } from 'react'
import CedantService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useFindById = (id: number) => {
  const [broker, setState] = useState<BrokerDto>()

  useEffect(() => {
    CedantService.findById(id)
      .then(broker => {
        setState(broker)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [id])

  return {
    broker
  }
}
