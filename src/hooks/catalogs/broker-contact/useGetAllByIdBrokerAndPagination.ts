import { useEffect, useState } from 'react'
import BrokerContactService from 'src/services/catalogs/broker-contact.service'
import {
  IBrokerContact,
  IBrokerContactsInfo,
  IBrokerContactsPagination
} from 'src/services/catalogs/dtos/broker-contact.dto'

const initialState: IBrokerContactsPagination = {
  idCBroker: 0,
  filters: [],
  info: {
    count: 0,
    page: 1,
    take: 5, //temp
    pages: 0,
    next: '',
    prev: ''
  }
}

const initialStateInfo: IBrokerContactsInfo = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllByIdBrokerAndPagination = () => {
  const [brokerContactsPagination, setBrokerContactsPagination] = useState<IBrokerContactsPagination>(initialState)
  const [brokerContacts, setBrokerContacts] = useState<IBrokerContact[]>([])
  const [brokerContactInfoPage, setBrokerContactInfoPage] = useState<IBrokerContactsInfo>(initialStateInfo)

  const getBrokerContactsByIdBroker = async (brokerContactsPagination: IBrokerContactsPagination) => {
    const { results, info } = await BrokerContactService.getBrokerContactsByIdBroker(
      brokerContactsPagination.idCBroker,
      brokerContactsPagination
    )
    setBrokerContacts(results)
    setBrokerContactInfoPage(info)
  }

  useEffect(() => {
    brokerContactsPagination &&
      brokerContactsPagination.idCBroker !== 0 &&
      getBrokerContactsByIdBroker(brokerContactsPagination)
    //eslint-disable-next-line
  }, [brokerContactsPagination])

  return {
    brokerContactsPagination,
    setBrokerContactsPagination,
    brokerContacts,
    getBrokerContactsByIdBroker,
    brokerContactInfoPage
  }
}
export default useGetAllByIdBrokerAndPagination
