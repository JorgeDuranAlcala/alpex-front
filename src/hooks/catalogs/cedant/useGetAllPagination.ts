import { useEffect, useState } from 'react'
import CedantService from 'src/services/catalogs/cedant.service'
import { CedantDto, CedantInfoDto, CedantsPaginationDto } from 'src/services/catalogs/dtos/cedant.dto'

const initialState: CedantsPaginationDto = {
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

const initialStateInfo: CedantInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllPagination = () => {
  const [cedantPagination, setCedantPagination] = useState<CedantsPaginationDto>(initialState)
  const [cedants, setCedants] = useState<CedantDto[]>([])
  const [cedantInfoPage, setCedantInfoPage] = useState<CedantInfoDto>(initialStateInfo)

  const getCedantsPagination = async (cedantPagination: CedantsPaginationDto) => {
    const { results, info } = await CedantService.getCedantsPagination(cedantPagination)
    setCedants(results)
    setCedantInfoPage(info)
  }

  useEffect(() => {
    cedantPagination && getCedantsPagination(cedantPagination)
  }, [cedantPagination])

  return {
    cedantPagination,
    setCedantPagination,
    cedants,
    getCedantsPagination,
    cedantInfoPage
  }
}
export default useGetAllPagination
