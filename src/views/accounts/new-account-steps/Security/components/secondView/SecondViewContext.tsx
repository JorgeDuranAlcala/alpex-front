import { SecurityDto } from "@/services/accounts/dtos/security.dto";
import { createContext } from "react";

export interface CreateSecondViewProps {
  formIndex: number;
  securities: SecurityDto[];
  calculateSecurities: (securities: SecurityDto[]) => void;
}

export interface SwitchViewProps extends CreateSecondViewProps {
  view: number;
}


interface SecondViewContextProps {
  isOpenModal: boolean;
  createSecondView: (props: CreateSecondViewProps) => void;
  switchView: (props: SwitchViewProps) => void;
  openModalSecondView: () => void;
  closeModalSecondView: () => void;
}

export const SecondViewContext = createContext<SecondViewContextProps>({} as SecondViewContextProps)
