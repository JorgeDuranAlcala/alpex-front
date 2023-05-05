import BrokerService from '@/services/catalogs/broker.service'
import { BrokerDto } from '@/services/catalogs/dtos/broker.dto'
import { useEffect, useState } from 'react'

export const useFindById = (id: number) => {
  const [broker, setState] = useState<BrokerDto>()

  useEffect(() => {
    BrokerService.findById(id)
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
