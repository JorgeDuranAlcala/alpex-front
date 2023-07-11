import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReactNode, useRef, useState } from 'react'
import { CreateSecondViewProps, DeleteSecondViewProps, SecondViewContext, SwitchViewProps } from './SecondViewContext'

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalUndo, setIsOpenModalUndo] = useState<boolean>(false)
  const [activeView, setActiveView] = useState(0)
  const [, setOriginalSecurities] = useState<SecurityDto[]>([])

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

  const createSecondView = ({ securities, calculateSecurities, information }: CreateSecondViewProps) => {
    setActiveView(1)

    setOriginalSecurities(() =>
      securities.map(security => ({
        ...security,
        netPremiumAt100: security.isGross ? information.grossPremium : information.netPremium,
        view: 1
      }))
    )
    calculateSecurities(securities, 1)
  }

  const deleteSecondView = ({ calculateSecurities, information, securities }: DeleteSecondViewProps) => {
    setActiveView(3)

    calculateSecurities(
      securities.map(security => ({
        ...security,
        netPremiumAt100: security.isGross ? information.grossPremium : information.netPremium,
        view: 1
      })),
      3
    )
  }

  const switchView = ({ securities, calculateSecurities, view, information }: SwitchViewProps) => {
    const viewChange = view === 1 ? 2 : 1
    setOriginalSecurities(() =>
      securities.map(security => ({
        ...security,
        netPremiumAt100: security.isGross ? information.grossPremium : information.netPremium,
        view: 1
      }))
    )
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
