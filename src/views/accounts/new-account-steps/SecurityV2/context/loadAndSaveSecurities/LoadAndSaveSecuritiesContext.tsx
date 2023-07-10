import { createContext } from "react";


interface LoadAndSaveSecuritiesContextProps {
  saveData: () => void;
}

export const LoadAndSaveSecuritiesContext = createContext({} as LoadAndSaveSecuritiesContextProps);
