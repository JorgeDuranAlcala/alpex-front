// ** React Imports
import { ReactNode, createContext, useReducer } from "react";

// ** Action types
import EAccountsTableActionTypes from "./actionTypes";

// ** Custom utilities
import { IAccount } from "src/views/accounts/Table";

interface IAccountsTableState {
    accounts: IAccount[]
}

const initialState: IAccountsTableState = {
    accounts:[]
};

const AccountsTableContext = createContext<{
    state: IAccountsTableState;
    dispatch: (action: { type: EAccountsTableActionTypes, payload: any }) => void;
  }>(null as any);

const reducer = (state: IAccountsTableState, action: { type: EAccountsTableActionTypes, payload: any }) => {
  switch (action.type) {
    case EAccountsTableActionTypes.GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload
    }
     
    default:
      return state;
  }

};

const AccountsTableContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = { state, dispatch };

  return (
    <AccountsTableContext.Provider value={data}>
      {children}
    </AccountsTableContext.Provider>
  );
};

export default AccountsTableContext;
export { AccountsTableContextProvider };
