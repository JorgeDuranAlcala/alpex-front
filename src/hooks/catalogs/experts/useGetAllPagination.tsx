import { useEffect, useState, useContext } from 'react'
import { ExpertsInfoDto, ExpertPaginationDto } from 'src/services/catalogs/dtos/expert.dto'
import { CataloguesClaimsContext } from 'src/context/catalogues-claims/reducer'
import CataloguesClaimsActionTypes from 'src/context/catalogues-claims/actionTypes';

import ExpertService from 'src/services/catalogs/expert.service';


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
  take: 10,
  pages: 0,
  next: '',
  prev: ''
}


const useGetAllPagination = () => {
  const [expertPagination, setExpertPagination] = useState(initialState)
  const { state: { experts }, dispatch } = useContext(CataloguesClaimsContext);
  const [expertInfoPage, setExpertInfoPage] = useState(initialStateInfo);


  const getExpertsPagination = async (expertPagination: ExpertPaginationDto) => {
    try {
      const expsCount = await ExpertService.getAll();
      const fetched = await ExpertService.getExpertsPagination(expertPagination)
      dispatch({ type: CataloguesClaimsActionTypes.SET_MANY_EXPERT, payload: fetched })
      const pages = Math.ceil(expsCount.length / expertPagination.info.take)
      setExpertInfoPage({ ...expertPagination.info, count: expsCount.length, pages })
    } catch (err) {
      if(!(err instanceof Error)) return;
      console.log("error", err)
      throw err
    }
  }

  useEffect(() => {
    expertPagination && getExpertsPagination(expertPagination)
  }, [expertPagination])

  return {
    getExpertsPagination,
    expertPagination,
    setExpertPagination,
    experts,
    expertInfoPage,
    setExpertInfoPage
  }
}
export default useGetAllPagination