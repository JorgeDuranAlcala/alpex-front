// ** React Imports
import { ReactNode, createContext, useReducer } from "react";

// ** Action types
import CataloguesClaimsActionTypes from "./actionTypes";

// ** Custom utilities
import { IAdjuster } from "src/views/catalogues/claims/adjuster";
import { IExpert } from "src/views/catalogues/claims/expert";

interface ICataloguesClaimsState {
    adjusters: IAdjuster[]
    experts: IExpert[]
}

const initialState: ICataloguesClaimsState = {
    adjusters:[
      {
          id: "1",
          siglas: "FFFF",
          razonSocial: "FFF",
          estado: "CIUDADE MEXICO",
          proveedor: "ADJUSTERS",
          rfc: "FFF",
          calle: "FFF",
          noExterior: 123,
          noInterior: 123,
          colonia: "FFF",
          municipio: "FFF",
          cp: 123,
          telefono: 123,
          correoContacto: "FFF",
          nombreContacto: "FFF",
          contactoReporte: "FFF",
          fechaContrato: "FFF",
          observaciones: "FFF",
      },
      {
        id: "2",
        siglas: "FFFF",
        razonSocial: "FFF",
        estado: "CIUDADE MEXICO",
        proveedor: "ADJUSTERS",
        rfc: "FFF",
        calle: "FFF",
        noExterior: 123,
        noInterior: 123,
        colonia: "FFF",
        municipio: "FFF",
        cp: 123,
        telefono: 123,
        correoContacto: "FFF",
        nombreContacto: "FFF",
        contactoReporte: "FFF",
        fechaContrato: "FFF",
        observaciones: "FFF",
    },
 ],
    experts: [
        {
          id: "1",
          siglas: "FFFF",
          razonSocial: "FFF",
          estado: "CIUDADE MEXICO",
          proveedor: "ADJUSTERS",
          rfc: "FFF",
          calle: "FFF",
          noExterior: 123,
          noInterior: 123,
          colonia: "FFF",
          municipio: "FFF",
          cp: 123,
          telefono: 123,
          correoContacto: "FFF",
          nombreContacto: "FFF",
          contactoReporte: "FFF",
          fechaContrato: "FFF",
          observaciones: "FFF",
      },
      {
        id: "2",
        siglas: "FFFF",
        razonSocial: "FFF",
        estado: "CIUDADE MEXICO",
        proveedor: "ADJUSTERS",
        rfc: "FFF",
        calle: "FFF",
        noExterior: 123,
        noInterior: 123,
        colonia: "FFF",
        municipio: "FFF",
        cp: 123,
        telefono: 123,
        correoContacto: "FFF",
        nombreContacto: "FFF",
        contactoReporte: "FFF",
        fechaContrato: "FFF",
        observaciones: "FFF",
    },
      ]
};

const CataloguesClaimsContext = createContext<{
    state: ICataloguesClaimsState;
    dispatch: (action: { type: CataloguesClaimsActionTypes, payload: any }) => void;
  }>(null as any);

const reducer = (state: ICataloguesClaimsState, action: { type: CataloguesClaimsActionTypes, payload: any }) => {
  switch (action.type) {
    case CataloguesClaimsActionTypes.SET_ADJUSTER:
      return {
        ...state,
        adjusters: [...state.adjusters, {...action.payload, id: Number(state.adjusters[state.adjusters.length - 1].id) + 1}]
      }
    break;
    case CataloguesClaimsActionTypes.SET_EXPERT:
        return {
            ...state,
            experts: [...state.experts, {...action.payload, id: Number(state.experts[state.experts.length - 1].id) + 1}]
        }
    break;
    case CataloguesClaimsActionTypes.UPDATE_ADJUSTER:
      return {
          ...state,
          adjusters: state.adjusters.map(adj => adj.id === action.payload.id ? {...adj, ...action.payload} : adj) 
      }
    break;
    case CataloguesClaimsActionTypes.REMOVE_EXPERT:
      return {
          ...state,
          adjusters: state.adjusters.filter(adj => adj.id !== action.payload.id) 
      }
    break;
    case CataloguesClaimsActionTypes.UPDATE_EXPERT:
      return {
          ...state,
          experts: state.experts.map(exp => exp.id === action.payload.id ? {...exp, ...action.payload} : exp) 
      }
    break;
    case CataloguesClaimsActionTypes.REMOVE_EXPERT:
      return {
          ...state,
          experts: state.experts.filter(exp => exp.id !== action.payload.id) 
      }
    break;
     
    default:
      return state;
  }

};

const CataloguesClaimsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = { state, dispatch };

  return (
    <CataloguesClaimsContext.Provider value={data}>
      {children}
    </CataloguesClaimsContext.Provider>
  );
};

const adjusterByIdSelector = (state: ICataloguesClaimsState, id: string) => state.adjusters.find(adj => adj.id == id);
const expertByIdSelector = (state: ICataloguesClaimsState, id: string) => state.experts.find(exp => exp.id == id);

export default CataloguesClaimsContextProvider;
export { CataloguesClaimsContext, adjusterByIdSelector, expertByIdSelector };
