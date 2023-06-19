import { useEffect, useState } from 'react'
import {
  ReinsuranceCompanyBinderTableDto,
  ReinsuranceCompanyBindersInfoDto,
  ReinsuranceCompanyBindersPaginationDto
} from 'src/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import ReinsuranceCompanyBinderService from 'src/services/catalogs/reinsuranceCompanyBinder.service'

const initialState: ReinsuranceCompanyBindersPaginationDto = {
  idCReinsuranceCompany: 0,
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

const initialStateInfo: ReinsuranceCompanyBindersInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllByIdReinsuranceCompanyAndPagination = () => {
  const [reinsuranceCompanyBindersPagination, setReinsuranceCompanyBindersPagination] =
    useState<ReinsuranceCompanyBindersPaginationDto>(initialState)
  const [reinsuranceCompanyBinders, setReinsuranceCompanyBinders] = useState<ReinsuranceCompanyBinderTableDto[]>([])
  const [reinsuranceCompanyBinderInfoPage, setReinsuranceCompanyBinderInfoPage] =
    useState<ReinsuranceCompanyBindersInfoDto>(initialStateInfo)

  const getReinsuranceCompanyBindersByIdReinsuranceCompany = async (
    reinsuranceCompanyBindersPagination: ReinsuranceCompanyBindersPaginationDto
  ) => {
    const { results, info } = await ReinsuranceCompanyBinderService.getReinsuranceCompanyBindersByIdReinsuranceCompany(
      reinsuranceCompanyBindersPagination.idCReinsuranceCompany,
      reinsuranceCompanyBindersPagination
    )
    setReinsuranceCompanyBinders(results)
    setReinsuranceCompanyBinderInfoPage(info)
  }

  useEffect(() => {
    reinsuranceCompanyBindersPagination &&
      reinsuranceCompanyBindersPagination.idCReinsuranceCompany !== 0 &&
      getReinsuranceCompanyBindersByIdReinsuranceCompany(reinsuranceCompanyBindersPagination)
  }, [reinsuranceCompanyBindersPagination])

  return {
    reinsuranceCompanyBindersPagination,
    setReinsuranceCompanyBindersPagination,
    reinsuranceCompanyBinders,
    getReinsuranceCompanyBindersByIdReinsuranceCompany,
    reinsuranceCompanyBinderInfoPage
  }
}
export default useGetAllByIdReinsuranceCompanyAndPagination
