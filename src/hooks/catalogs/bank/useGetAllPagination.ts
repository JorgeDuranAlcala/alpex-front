import { useEffect, useState, useContext } from 'react'
import { BankInfoDto, BankPaginationDto } from 'src/services/catalogs/dtos/bank.dto'
import bankService from 'src/services/catalogs/bank.service'

import { DynamicContext } from 'src/context/dynamic/reducer'
import DynamicActionTypes from 'src/context/dynamic/actionTypes'


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
  take: 10,
  pages: 0,
  next: '',
  prev: ''
}


const useGetAllPagination = () => {
  const [banksPagination, setBanksPagination] = useState(initialState)
  const { state: { banks }, dispatch } = useContext(DynamicContext);
  const [bankInfoPage, setBankInfoPage] = useState(initialStateInfo);

  const getBanksPagination = async (bankPagination: BankPaginationDto) => {
    try {
      const banksCount = await bankService.getAll();
      const fetched_banks = await bankService.getBanksPagination(bankPagination)
      dispatch({ type: DynamicActionTypes.SET_MANY_BANK, payload: fetched_banks })
      const pages = Math.ceil(banksCount.length / bankPagination.info.take)
      setBankInfoPage({ ...bankPagination.info, count: banksCount.length, pages })
    } catch (err) {
      if(!(err instanceof Error)) return;
      console.log("error", err)
      throw err
    }
  }



  useEffect(() => {
    banksPagination && getBanksPagination(banksPagination)
  }, [banksPagination])

  return {
    banksPagination,
    setBanksPagination,
    banks,
    bankInfoPage,
    setBankInfoPage,
    getBanksPagination
  }
}
export default useGetAllPagination