import { useEffect, useState } from 'react'
import BrokerService from 'src/services/catalogs/broker.service'
import { BrokerDto, BrokerInfoDto, BrokersPaginationDto } from 'src/services/catalogs/dtos/broker.dto'

const initialState: BrokersPaginationDto = {
  filters: [],
  info: {
    count: 0,
    page: 1,
    take: 10, //temp
    pages: 0,
    next: '',
    prev: ''
  }
}

const initialStateInfo: BrokerInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllPagination = () => {
  const [brokerPagination, setBrokerPagination] = useState<BrokersPaginationDto>(initialState)
  const [brokers, setBrokers] = useState<BrokerDto[]>([])
  const [brokerInfoPage, setBrokerInfoPage] = useState<BrokerInfoDto>(initialStateInfo)

  const getBrokersPagination = async (brokerPagination: BrokersPaginationDto) => {
    const { results, info } = await BrokerService.getBrokersPagination(brokerPagination)
    setBrokers(results)
    setBrokerInfoPage(info)
  }

  useEffect(() => {
    brokerPagination && getBrokersPagination(brokerPagination)
  }, [brokerPagination])

  return {
    brokerPagination,
    setBrokerPagination,
    brokers,
    getBrokersPagination,
    brokerInfoPage
  }
}
export default useGetAllPagination
