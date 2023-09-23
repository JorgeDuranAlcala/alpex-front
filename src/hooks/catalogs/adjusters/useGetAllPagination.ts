import { useEffect, useState, useContext } from 'react'
import { AdjusterInfoDto, AdjusterPaginationDto } from 'src/services/catalogs/dtos/adjuster.dto'
import { CataloguesClaimsContext } from 'src/context/catalogues-claims/reducer'

const initialState: AdjusterPaginationDto = {
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

const initialStateInfo: AdjusterInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}


const useGetAllPagination = () => {
  const [adjusterPagination, setAdjusterPagination] = useState(initialState)
  const { state: { adjusters } } = useContext(CataloguesClaimsContext);
  const [adjusterInfoPage, setAdjusterInfoPage] = useState(initialStateInfo)

  useEffect(() => {
    setAdjusterInfoPage(initialStateInfo)
  }, [])

  return {
    adjusterPagination,
    setAdjusterPagination,
    adjusters,
    adjusterInfoPage
  }
}
export default useGetAllPagination