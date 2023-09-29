import { useEffect, useState, useContext } from 'react'
import { BankInfoDto, BankPaginationDto } from 'src/services/catalogs/dtos/bank.dto'
import bankService from 'src/services/catalogs/bank.service'

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
    (async () => {
      try {
        const banks = await bankService.getBanksPagination(banksPagination);
        console.log("banks", banks);
      } catch (err) {
        console.log("error", err)
      }
    })()
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