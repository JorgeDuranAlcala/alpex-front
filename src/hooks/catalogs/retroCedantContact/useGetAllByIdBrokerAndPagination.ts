import { useEffect, useState } from 'react'
import {
  RetroCedantContactTableDto,
  RetroCedantContactsInfoDto,
  RetroCedantContactsPaginationDto
} from 'src/services/catalogs/dtos/retroCedantContact.dto'
import RetroCedantContactService from 'src/services/catalogs/retroCedantContact.service'

const initialState: RetroCedantContactsPaginationDto = {
  idCRetroCedant: 0,
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

const initialStateInfo: RetroCedantContactsInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllByIdRetroCedantAndPagination = () => {
  const [retroCedantContactsPagination, setRetroCedantContactsPagination] =
    useState<RetroCedantContactsPaginationDto>(initialState)
  const [retroCedantContacts, setRetroCedantContacts] = useState<RetroCedantContactTableDto[]>([])
  const [retroCedantContactInfoPage, setRetroCedantContactInfoPage] =
    useState<RetroCedantContactsInfoDto>(initialStateInfo)

  const getRetroCedantContactsByIdRetroCedant = async (
    retroCedantContactsPagination: RetroCedantContactsPaginationDto
  ) => {
    const { results, info } = await RetroCedantContactService.getRetroCedantContactsByIdRetroCedant(
      retroCedantContactsPagination.idCRetroCedant,
      retroCedantContactsPagination
    )
    setRetroCedantContacts(results)
    setRetroCedantContactInfoPage(info)
  }

  useEffect(() => {
    retroCedantContactsPagination &&
      retroCedantContactsPagination.idCRetroCedant !== 0 &&
      getRetroCedantContactsByIdRetroCedant(retroCedantContactsPagination)
  }, [retroCedantContactsPagination])

  return {
    retroCedantContactsPagination,
    setRetroCedantContactsPagination,
    retroCedantContacts,
    getRetroCedantContactsByIdRetroCedant,
    retroCedantContactInfoPage
  }
}
export default useGetAllByIdRetroCedantAndPagination
