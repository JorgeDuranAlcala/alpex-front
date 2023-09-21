import { useEffect, useState, useContext } from 'react'
import { BankInfoDto, BankPaginationDto } from 'src/services/catalogs/dtos/bank.dto'
import { DynamicContext } from 'src/context/dynamic/reducer'

const initialState: BankPaginationDto = {
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

const initialStateInfo: BankInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}


const useGetAllPagination = () => {
  const [banksPagination, setBanksPagination] = useState(initialState)
  const { state: { banks } } = useContext(DynamicContext);
  const [bankInfoPage, setBankInfoPage] = useState(initialStateInfo)

  useEffect(() => {
    setBankInfoPage(initialStateInfo)
  }, [])

  return {
    banksPagination,
    setBanksPagination,
    banks,
    bankInfoPage,
    setBankInfoPage
  }
}
export default useGetAllPagination