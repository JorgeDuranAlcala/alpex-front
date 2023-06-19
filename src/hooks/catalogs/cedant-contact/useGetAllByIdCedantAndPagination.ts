import { useEffect, useState } from 'react'
import CedantContactService from 'src/services/catalogs/cedant-contact.service'
import {
  CedantContactTableDto,
  CedantContactsInfoDto,
  CedantContactsPaginationDto
} from 'src/services/catalogs/dtos/cedant-contact.dto'

const initialState: CedantContactsPaginationDto = {
  idCCedant: 0,
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

const initialStateInfo: CedantContactsInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

const useGetAllByIdCedantAndPagination = () => {
  const [cedantContactsPagination, setCedantContactsPagination] = useState<CedantContactsPaginationDto>(initialState)
  const [cedantContacts, setCedantContacts] = useState<CedantContactTableDto[]>([])
  const [cedantContactInfoPage, setCedantContactInfoPage] = useState<CedantContactsInfoDto>(initialStateInfo)

  const getCedantContactsByIdCedant = async (cedantContactsPagination: CedantContactsPaginationDto) => {
    const { results, info } = await CedantContactService.getCedantContactsByIdCedant(
      cedantContactsPagination.idCCedant,
      cedantContactsPagination
    )
    setCedantContacts(results)
    setCedantContactInfoPage(info)
  }

  useEffect(() => {
    cedantContactsPagination &&
      cedantContactsPagination.idCCedant !== 0 &&
      getCedantContactsByIdCedant(cedantContactsPagination)
  }, [cedantContactsPagination])

  return {
    cedantContactsPagination,
    setCedantContactsPagination,
    cedantContacts,
    getCedantContactsByIdCedant,
    cedantContactInfoPage
  }
}
export default useGetAllByIdCedantAndPagination
