// ** React Imports
import { useContext } from "react"

// ** Context
import EAccountsTableActionTypes from "src/context/accounts/Table/actionTypes"
import AccountsTableContext from 'src/context/accounts/Table/reducer'

// ** Services
import accountsService from "src/services/accounts/accounts.service"



const useAccountTable = () => {
    const { state, dispatch } = useContext(AccountsTableContext)
    const { accounts } = state
    
    const getAccounts = async () => {
        try {
            const response = await accountsService.getAccounts()
            dispatch({ 
                type: EAccountsTableActionTypes.GET_ACCOUNTS, 
                payload: response 
            })
        } catch (error) {
            console.error(error)
        }
    }


  return {
    accounts,
    getAccounts
  }
}

export default useAccountTable