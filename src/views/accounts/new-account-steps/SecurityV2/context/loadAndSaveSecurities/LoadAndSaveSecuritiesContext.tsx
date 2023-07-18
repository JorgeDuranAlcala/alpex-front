import { createContext } from "react";


interface LoadAndSaveSecuritiesContextProps {
  saveData: () => void;
  isDataLoaded: boolean;
}

export const LoadAndSaveSecuritiesContext = createContext({} as LoadAndSaveSecuritiesContextProps);
