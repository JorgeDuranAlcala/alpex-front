import type { errorsSecurity } from "@/services/accounts/dtos/security.dto"
import { createContext } from "react"
import type { Security } from "../../store/securitySlice"


export interface ValidateFormProps { securityParam: Security, index: number }

export interface FormValidationsContextProps {
  isActiveErrors: boolean,
  errorsSecurity: { [key: number]: errorsSecurity },
  allErrors: boolean[],
  validateForm: ({ securityParam, index }: ValidateFormProps) => void
  setActiveErrors: (value: boolean) => void,
  updateAllErrors: (errors: boolean[]) => void
}

export const FormValidationsContext = createContext<FormValidationsContextProps>({} as FormValidationsContextProps)
