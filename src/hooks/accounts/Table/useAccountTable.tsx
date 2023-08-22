// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { GridRowId } from '@mui/x-data-grid'

// ** Context
import AccountsTableContext from 'src/context/accounts/Table/reducer'

// ** Services
import accountsService from 'src/services/accounts/account.service'

// ** Custom utilities
import { UpdateStatusArrayDto, UpdateTypeLogoDto } from '@/services/accounts/dtos/account.dto'
import { useAppDispatch, useAppSelector } from '@/store'
import { IAccountsState } from '@/types/apps/accountsTypes'
import { fetchAccounts } from 'src/store/apps/accounts'

const useAccountTable = () => {
  // **Reducers
  const dispatchRedux = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  const { state } = useContext(AccountsTableContext)
  const { accounts } = state

  const getAccounts = async (usersData: IAccountsState, urlQ?: string) => {
    try {
      const response = await accountsService.getAccounts(usersData, urlQ)

      return response
    } catch (error) {
      console.error(error)
    }
  }

  const deleteAccounts = async (selectedRows: GridRowId[]) => {
    try {
      const response = await accountsService.deleteAccounts(selectedRows as number[])
      dispatchRedux(fetchAccounts(accountsReducer.info.page))

      return response
    } catch (error) {
      console.error(error)
    }
  }

  const duplicateAccounts = async (selectedRows: GridRowId[]) => {
    try {
      const response = await accountsService.duplicateAccounts(selectedRows as number[])
      dispatchRedux(fetchAccounts(accountsReducer.info.page))

      return response
    } catch (error) {
      console.error(error)
    }
  }

  const changeStatusAccounts = async (updateStatus: UpdateStatusArrayDto) => {
    try {
      const response = await accountsService.updateAccountsStatus(updateStatus)
      dispatchRedux(fetchAccounts(accountsReducer.info.page))

      return response
    } catch (error) {
      console.error(error)
    }
  }
  const changeTypeLogo = async (updateTypeLogo: UpdateTypeLogoDto) => {
    try {
      const response = await accountsService.updateTypeLogo(updateTypeLogo)
      dispatchRedux(fetchAccounts(accountsReducer.info.page))

      return response
    } catch (error) {
      console.error(error)
    }
  }

  return {
    accounts,
    getAccounts,
    deleteAccounts,
    duplicateAccounts,
    changeStatusAccounts,
    changeTypeLogo
  }
}

export default useAccountTable
