import { useEffect, useState } from 'react'
import BrokeService from 'src/services/catalogs/broker.service'
import { BrokerDto } from 'src/services/catalogs/dtos/broker.dto'

export const useGetAll = () => {
  const [brokers, setBrokers] = useState<BrokerDto[]>([])

  useEffect(() => {
    BrokeService.getAll()
      .then(brokers => {
        setBrokers(brokers)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return {
    brokers
  }
}
