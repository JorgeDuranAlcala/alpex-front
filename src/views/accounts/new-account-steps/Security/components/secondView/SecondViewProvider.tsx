import { ReactNode, useRef, useState } from 'react'
import { CreateSecondViewProps, DeleteSecondViewProps, SecondViewContext, SwitchViewProps } from './SecondViewContext'

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalUndo, setIsOpenModalUndo] = useState<boolean>(false)
  const [activeView, setActiveView] = useState(0)

  const $inputRef = useRef<{ [key: number]: HTMLInputElement }>({})

  const openModalSecondView = () => {
    setIsOpenModal(true)
  }
  const closeModalSecondView = () => {
    setIsOpenModal(false)
  }

  const openModalUndo = () => {
    setIsOpenModalUndo(true)
  }
  const closeModalUndo = () => {
    setIsOpenModalUndo(false)
  }

  const createSecondView = ({ securities, calculateSecurities }: CreateSecondViewProps) => {
    setActiveView(1)

    calculateSecurities(securities, 1)
  }

  const deleteSecondView = ({ calculateSecurities }: DeleteSecondViewProps) => {
    setActiveView(0)

    calculateSecurities([], 0)
  }

  const switchView = ({ securities, calculateSecurities, view }: SwitchViewProps) => {
    const viewChange = view === 1 ? 2 : 1

    setActiveView(viewChange)
    calculateSecurities(securities, viewChange)
  }

  return (
    <SecondViewContext.Provider
      value={{
        $inputRef: $inputRef.current,
        activeView,
        isOpenModal,
        isOpenModalUndo,
        openModalSecondView,
        closeModalSecondView,
        openModalUndo,
        closeModalUndo,
        createSecondView,
        deleteSecondView,
        switchView
      }}
    >
      {children}
    </SecondViewContext.Provider>
  )
}
