import { useEffect, useState, useContext } from 'react'
import { ExpertsInfoDto, ExpertPaginationDto } from 'src/services/catalogs/dtos/expert.dto'
import { CataloguesClaimsContext } from 'src/context/catalogues-claims/reducer'

const initialState: ExpertPaginationDto = {
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

const initialStateInfo: ExpertsInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}


const useGetAllPagination = () => {
  const [expertPagination, setExpertPagination] = useState(initialState)
  const { state: { experts } } = useContext(CataloguesClaimsContext);
  const [expertInfoPage, setExpertInfoPage] = useState(initialStateInfo);


  useEffect(() => {
    setExpertInfoPage(initialStateInfo)
  }, [])

  return {
    expertPagination,
    setExpertPagination,
    experts,
    expertInfoPage,
    setExpertInfoPage
  }
}
export default useGetAllPagination