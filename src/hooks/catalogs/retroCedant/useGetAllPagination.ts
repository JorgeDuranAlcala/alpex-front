import { useEffect, useState } from 'react'
import {
  RetroCedantDto,
  RetroCedantInfoDto,
  RetroCedantsPaginationDto
} from 'src/services/catalogs/dtos/RetroCedantDto'
import RetroCedantService from 'src/services/catalogs/retroCedant.service'

const initialState: RetroCedantsPaginationDto = {
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

const initialStateInfo: RetroCedantInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllPagination = () => {
  const [retroCedantPagination, setRetroCedantPagination] = useState<RetroCedantsPaginationDto>(initialState)
  const [retroCedants, setRetroCedants] = useState<RetroCedantDto[]>([])
  const [retroCedantInfoPage, setRetroCedantInfoPage] = useState<RetroCedantInfoDto>(initialStateInfo)

  const getRetroCedantsPagination = async (retroCedantPagination: RetroCedantsPaginationDto) => {
    const { results, info } = await RetroCedantService.getRetroCedantsPagination(retroCedantPagination)
    setRetroCedants(results)
    setRetroCedantInfoPage(info)
  }

  useEffect(() => {
    retroCedantPagination && getRetroCedantsPagination(retroCedantPagination)
  }, [retroCedantPagination])

  return {
    retroCedantPagination,
    setRetroCedantPagination,
    retroCedants,
    getRetroCedantsPagination,
    retroCedantInfoPage
  }
}
export default useGetAllPagination
