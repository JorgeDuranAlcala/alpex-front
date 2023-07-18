import { createContext } from 'react'


export interface SwitchViewProps {
  toView: number
}

interface SecondViewContextProps {
  $inputRef: { [key: number]: HTMLInputElement | null }
  isOpenModal: boolean
  isOpenModalUndo: boolean
  handleCreateSecondView: () => void
  handleDeleteSecondView: () => void
  handleSwitchView: (props: SwitchViewProps) => void
  openModalSecondView: () => void
  closeModalSecondView: () => void
  openModalUndo: () => void
  closeModalUndo: () => void
}

export const SecondViewContext = createContext<SecondViewContextProps>({} as SecondViewContextProps)
