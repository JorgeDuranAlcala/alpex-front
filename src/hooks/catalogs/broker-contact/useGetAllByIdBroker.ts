import { useEffect, useState } from 'react'
import BrokerContactService from 'src/services/catalogs/broker-contact.service'
import { BrokerContactDto } from 'src/services/catalogs/dtos/broker-contact.dto'

const useGetAllByIdBroker = () => {
  const [brokerContacts, setBrokerContacts] = useState<BrokerContactDto[]>([])
  const [idBroker, setIdBroker] = useState<null | number>(null)
  const findByIdBroker = (idBroker: number) => {
    BrokerContactService.findByIdBroker(idBroker).then(setBrokerContacts)
  }
  useEffect(() => {
    idBroker && findByIdBroker(idBroker)
  }, [idBroker])

  return {
    brokerContacts,
    setIdBroker,
    findByIdBroker
  }
}
export default useGetAllByIdBroker
