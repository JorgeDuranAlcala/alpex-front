import { SecurityDto } from "@/services/accounts/dtos/security.dto";
import { createContext } from "react";

export interface CreateSecondViewProps {
  formIndex: number;
  securities: SecurityDto[];
  calculateSecurities: (securities: SecurityDto[]) => void;
}

// export interface DeleteSecondViewProps extends CreateSecondViewProps {

// }

export type DeleteSecondViewProps = CreateSecondViewProps;

export interface SwitchViewProps extends CreateSecondViewProps {
  view: number;
}


interface SecondViewContextProps {
  isFormHasSecondView: { [key: number]: boolean };
  isFormDeletedSecondView: { [key: number]: boolean };
  $inputRef: { [key: number]: HTMLInputElement | null };
  isOpenModal: { [key: number]: boolean };
  isOpenModalUndo: { [key: number]: boolean };
  createSecondView: (props: CreateSecondViewProps) => void;
  deleteSecondView: (props: DeleteSecondViewProps) => void;
  switchView: (props: SwitchViewProps) => void;
  openModalSecondView: (formIndex: number) => void;
  closeModalSecondView: (formIndex: number) => void;
  openModalUndo: (formIndex: number) => void;
  closeModalUndo: (formIndex: number) => void;
}

export const SecondViewContext = createContext<SecondViewContextProps>({} as SecondViewContextProps)
