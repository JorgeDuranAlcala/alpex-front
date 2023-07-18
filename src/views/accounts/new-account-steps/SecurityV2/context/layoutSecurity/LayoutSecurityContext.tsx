import { createContext } from "react";


export interface LayoutSecurityContextProps {

  fontFamily: string;
  isOpenNextModal: boolean;
  isNextStep: boolean;
  isDataLoaded: boolean;
  handleAddNewForm: () => void;
  handleCloseNextModal: () => void;
  handleBeforeNextStep: () => void;
  handleNextStep: () => void;
  handleSaveData: () => void;
}

export const LayoutSecurityContext = createContext<LayoutSecurityContextProps>({} as LayoutSecurityContextProps)
