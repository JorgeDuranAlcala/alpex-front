import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { createContext } from 'react'

export interface CreateSecondViewProps {
  securities: SecurityDto[]
  calculateSecurities: (securities: SecurityDto[]) => void
}

// export interface DeleteSecondViewProps extends CreateSecondViewProps {

// }

export type DeleteSecondViewProps = CreateSecondViewProps

export interface SwitchViewProps extends CreateSecondViewProps {
  view: number
}

interface SecondViewContextProps {
  activeView: number
  $inputRef: { [key: number]: HTMLInputElement | null }
  isOpenModal: boolean
  isOpenModalUndo: boolean
  createSecondView: (props: CreateSecondViewProps) => void
  deleteSecondView: (props: DeleteSecondViewProps) => void
  switchView: (props: SwitchViewProps) => void
  openModalSecondView: () => void
  closeModalSecondView: () => void
  openModalUndo: () => void
  closeModalUndo: () => void
  securitesOriginal: SecurityDto[]
  createSecuritiesOriginal: (security: SecurityDto) => void
}

export const SecondViewContext = createContext<SecondViewContextProps>({} as SecondViewContextProps)
