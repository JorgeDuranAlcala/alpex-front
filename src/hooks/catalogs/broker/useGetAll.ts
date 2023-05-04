import BrokerService from '@/services/catalogs/broker.service'
import { BrokerDto } from '@/services/catalogs/dtos/broker.dto'
import { useEffect, useState } from 'react'

export const useGetAll = () => {
  const [state, setState] = useState<BrokerDto[]>()

  useEffect(() => {
    BrokerService.getAll()
      .then(brokers => {
        setState(brokers)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return {
    state
  }
}
