import { useEffect, useState } from 'react'
import {
  ReinsuranceCompanyDto,
  ReinsuranceCompanyInfoDto,
  ReinsuranceCompanysPaginationDto
} from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'
import ReinsuranceCompanyService from 'src/services/catalogs/reinsuranceCompany.service'

const initialState: ReinsuranceCompanysPaginationDto = {
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

const initialStateInfo: ReinsuranceCompanyInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllPagination = () => {
  const [reinsuranceCompanyPagination, setReinsuranceCompanyPagination] =
    useState<ReinsuranceCompanysPaginationDto>(initialState)
  const [reinsuranceCompanys, setReinsuranceCompanys] = useState<ReinsuranceCompanyDto[]>([])
  const [reinsuranceCompanyInfoPage, setReinsuranceCompanyInfoPage] =
    useState<ReinsuranceCompanyInfoDto>(initialStateInfo)

  const getReinsuranceCompanysPagination = async (reinsuranceCompanyPagination: ReinsuranceCompanysPaginationDto) => {
    const { results, info } = await ReinsuranceCompanyService.getReinsuranceCompanyPagination(
      reinsuranceCompanyPagination
    )
    setReinsuranceCompanys(results)
    setReinsuranceCompanyInfoPage(info)
  }

  useEffect(() => {
    reinsuranceCompanyPagination && getReinsuranceCompanysPagination(reinsuranceCompanyPagination)
  }, [reinsuranceCompanyPagination])

  return {
    reinsuranceCompanyPagination,
    setReinsuranceCompanyPagination,
    reinsuranceCompanys,
    getReinsuranceCompanysPagination,
    reinsuranceCompanyInfoPage
  }
}
export default useGetAllPagination
