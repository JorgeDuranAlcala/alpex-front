import { createContext } from "react";


export interface LayoutSecurityContextProps {

  fontFamily: string;
  isOpenNextModal: boolean;
  isNextStep: boolean;
  handleCloseNextModal: () => void;
  handleNextStep: () => void;
}

export const LayoutSecurityContext = createContext<LayoutSecurityContextProps>({} as LayoutSecurityContextProps)
