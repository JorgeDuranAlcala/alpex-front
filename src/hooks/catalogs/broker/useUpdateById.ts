import BrokerService from '@/services/catalogs/broker.service'
import { BrokerDto } from '@/services/catalogs/dtos/broker.dto'
import { useEffect, useState } from 'react'

export const useUpdateById = (id: number, body: Partial<BrokerDto>) => {
  const [bodyState, setBody] = useState<Partial<BrokerDto>>(body)
  const [result, setResult] = useState<BrokerDto>()

  useEffect(() => {
    BrokerService.updateById(id, bodyState)
      .then(broker => {
        setResult(broker)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [body, id])

  return {
    result,
    setBody
  }
}
