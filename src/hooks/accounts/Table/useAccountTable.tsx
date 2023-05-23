// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import { GridRowId } from '@mui/x-data-grid'

// ** Context
import EAccountsTableActionTypes from 'src/context/accounts/Table/actionTypes'
import AccountsTableContext from 'src/context/accounts/Table/reducer'

// ** Services
import accountsService from 'src/services/accounts/account.service'

// ** Custom utilities
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useAppDispatch, useAppSelector } from '@/store'
import { IAccountsState } from '@/types/apps/accountsTypes'
import { fetchAccounts } from 'src/store/apps/accounts'
import { EStatus } from 'src/views/accounts/Table/Status'

const useAccountTable = () => {
  // **Reducers
  const dispatchRedux = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  const [jwtToken] = useLocalStorage('accessToken', false)
  const { state, dispatch } = useContext(AccountsTableContext)
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
      const response = await accountsService.deleteAccounts(selectedRows as number[], jwtToken)
      dispatchRedux(fetchAccounts(accountsReducer))

      return response
    } catch (error) {
      console.error(error)
    }
  }

  const duplicateAccounts = async (selectedRows: GridRowId[]) => {
    try {
      const response = await accountsService.duplicateAccounts(selectedRows as number[], jwtToken)
      dispatchRedux(fetchAccounts(accountsReducer))

      return response
    } catch (error) {
      console.error(error)
    }
  }

  const changeStatusAccounts = async (selectedRows: GridRowId[], status: EStatus) => {
    try {
      //const response = await accountsService.getAccounts()
      const newAccounts = accounts.map(account => {
        if (selectedRows.find(id => id === account.id)) {
          return {
            ...account,
            status: status
          }
        }

        return account
      })
      dispatch({
        type: EAccountsTableActionTypes.SET_ACCOUNTS,
        payload: newAccounts
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    accounts,
    getAccounts,
    deleteAccounts,
    duplicateAccounts,
    changeStatusAccounts
  }
}

export default useAccountTable
