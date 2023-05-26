import { useEffect, useState } from 'react'
import {
  ReinsuranceCompanyContactDto,
  ReinsuranceCompanyContactsInfoDto,
  ReinsuranceCompanyContactsPaginationDto
} from 'src/services/catalogs/dtos/ReinsuranceCompanyContact.dto'
import ReinsuranceCompanyContactService from 'src/services/catalogs/reinsuranceCompanyContact.service'

const initialState: ReinsuranceCompanyContactsPaginationDto = {
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

const initialStateInfo: ReinsuranceCompanyContactsInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllByIdReinsuranceCompanyAndPagination = () => {
  const [reinsuranceCompanyContactsPagination, setReinsuranceCompanyContactsPagination] =
    useState<ReinsuranceCompanyContactsPaginationDto>(initialState)
  const [reinsuranceCompanyContacts, setReinsuranceCompanyContacts] = useState<ReinsuranceCompanyContactDto[]>([])
  const [reinsuranceCompanyContactInfoPage, setReinsuranceCompanyContactInfoPage] =
    useState<ReinsuranceCompanyContactsInfoDto>(initialStateInfo)

  const getReinsuranceCompanyContactsByIdReinsuranceCompany = async (
    reinsuranceCompanyContactsPagination: ReinsuranceCompanyContactsPaginationDto
  ) => {
    const { results, info } =
      await ReinsuranceCompanyContactService.getReinsuranceCompanyContactsByIdReinsuranceCompany(
        reinsuranceCompanyContactsPagination.idCReinsuranceCompany,
        reinsuranceCompanyContactsPagination
      )
    setReinsuranceCompanyContacts(results)
    setReinsuranceCompanyContactInfoPage(info)
  }

  useEffect(() => {
    reinsuranceCompanyContactsPagination &&
      getReinsuranceCompanyContactsByIdReinsuranceCompany(reinsuranceCompanyContactsPagination)
  }, [reinsuranceCompanyContactsPagination])

  return {
    reinsuranceCompanyContactsPagination,
    setReinsuranceCompanyContactsPagination,
    reinsuranceCompanyContacts,
    getReinsuranceCompanyContactsByIdReinsuranceCompany,
    reinsuranceCompanyContactInfoPage
  }
}
export default useGetAllByIdReinsuranceCompanyAndPagination
