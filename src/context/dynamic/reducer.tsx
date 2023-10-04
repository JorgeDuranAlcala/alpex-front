// ** React Imports
import { ReactNode, createContext, useReducer } from "react";

// ** Action types
import DynamicActionTypes from "./actionTypes";

// ** Custom utilities
import { IBank } from "src/views/catalogues/dynamic/bank-table";

interface IDynamicState {
  banks: IBank[]
}

const initialState: IDynamicState = {
  banks: [
    /*
      {
          id: "1",
          capacity: "Capacity",
          location: "MX",
          bank: "Bank of Mexico",
          beneficiary: "John Doe",
          accountNumber: "1234567890",
          swift: "ABCD1234",
          aba: "987654321",
          clabe: "0987654321",
          currency: "MXN",
          intermediary: "Intermediary Bank",
          furtherAccountInfo: "Some further account info"
      },
      {
          id: "2",
          capacity: "Capacity",
          location: "MX",
          bank: "Bank of Jalisco",
          beneficiary: "Jane Smith",
          accountNumber: "0987654321",
          swift: "EFGH5678",
          aba: "123456789",
          clabe: "2345678901",
          currency: "USD",
          intermediary: "Another Intermediary Bank",
          furtherAccountInfo: "Additional account info"
      },
      */
  ],
};

const DynamicContext = createContext<{
  state: IDynamicState;
  dispatch: (action: { type: DynamicActionTypes, payload: any }) => void;
}>(null as any);

const reducer = (state: IDynamicState, action: { type: DynamicActionTypes, payload: any }) => {
  switch (action.type) {
    case DynamicActionTypes.SET_BANK:
      return {
        ...state,
        banks: [...state.banks, { ...action.payload }]
      }
      break;
    case DynamicActionTypes.SET_MANY_BANK:
      return {
        ...state,
        banks: action.payload
      }
      break;
    case DynamicActionTypes.UPDATE_BANK:
      return {
        ...state,
        banks: state.banks.map(bank => bank.id === action.payload.id ? { ...bank, ...action.payload } : bank)
      }
      break;
    case DynamicActionTypes.REMOVE_BANK:
      return {
        ...state,
        banks: state.banks.filter(bank => bank.id !== action.payload.id)
      }
      break;

    default:
      return state;
  }

};

const DynamicContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = { state, dispatch };

  return (
    <DynamicContext.Provider value={data}>
      {children}
    </DynamicContext.Provider>
  );
};

const bankByIdSelector = (state: IDynamicState, id: number) => state.banks.find(b => b.id === id);
export default DynamicContextProvider;
export { DynamicContext, bankByIdSelector };