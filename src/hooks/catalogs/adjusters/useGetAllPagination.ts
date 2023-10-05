import { useEffect, useState, useContext } from 'react'
import { AdjusterInfoDto, AdjusterPaginationDto } from 'src/services/catalogs/dtos/adjuster.dto'
import { CataloguesClaimsContext } from 'src/context/catalogues-claims/reducer'
import AdjusterService from 'src/services/catalogs/adjuster.service';
import CataloguesClaimsActionTypes from 'src/context/catalogues-claims/actionTypes';

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
  take: 10,
  pages: 0,
  next: '',
  prev: ''
}


const useGetAllPagination = () => {
  const [adjusterPagination, setAdjusterPagination] = useState(initialState)
  const { state: { adjusters }, dispatch } = useContext(CataloguesClaimsContext);
  const [adjusterInfoPage, setAdjusterInfoPage] = useState(initialStateInfo)

  const getAdjusterPagination = async (adjusterPagination: AdjusterPaginationDto) => {
    try {
      const adjsCount = await AdjusterService.getAll();
      const fetched = await AdjusterService.getAdjustersPagination(adjusterPagination)
      dispatch({ type: CataloguesClaimsActionTypes.SET_MANY_ADJUSTER, payload: fetched })
      const pages = Math.ceil(adjsCount.length / adjusterPagination.info.take)
      setAdjusterInfoPage({ ...adjusterPagination.info, count: adjsCount.length, pages })
    } catch (err) {
      if(!(err instanceof Error)) return;
      console.log("error", err)
      throw err
    }
  }

  useEffect(() => {
    adjusterPagination && getAdjusterPagination(adjusterPagination)
  }, [adjusterPagination])

  return {
    getAdjusterPagination,
    adjusterPagination,
    setAdjusterPagination,
    adjusters,
    adjusterInfoPage
  }
}
export default useGetAllPagination