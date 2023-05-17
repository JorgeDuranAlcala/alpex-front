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
import { IAccountsState } from '@/types/apps/accountsTypes'
import { EStatus } from 'src/views/accounts/Table/Status'

const useAccountTable = () => {
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
      //const response = await accountsService.getAccounts()
      const newAccounts = accounts.filter(account => {
        return !selectedRows.find(id => id === account.id)
      })
      dispatch({
        type: EAccountsTableActionTypes.SET_ACCOUNTS,
        payload: newAccounts
      })
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
    changeStatusAccounts
  }
}

export default useAccountTable
