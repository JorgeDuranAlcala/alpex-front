import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReactNode, useRef, useState } from 'react'
import { CreateSecondViewProps, DeleteSecondViewProps, SecondViewContext, SwitchViewProps } from './SecondViewContext'

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalUndo, setIsOpenModalUndo] = useState<boolean>(false)
  const [activeView, setActiveView] = useState(0)
  const [securitesOriginal, setSecuritiesOriginal] = useState<SecurityDto[]>([])
  const [securitesV1, setSecuritiesV1] = useState<SecurityDto[]>([])

  const $inputRef = useRef<{ [key: number]: HTMLInputElement }>({})

  const openModalSecondView = () => {
    console.log('open modal second view')
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
  const createSecuritiesOriginal = (security: SecurityDto) => {
    securitesOriginal.push({ ...security, view: 2 })
  }
  const createSecondView = ({ securities, calculateSecurities }: CreateSecondViewProps) => {
    const tempSecurities = securities.map(security => ({ ...security, view: 2 }))
    setActiveView(1)

    securitesOriginal.length === 0 && setSecuritiesOriginal(tempSecurities)

    console.log('end create')

    calculateSecurities(securities, securitesOriginal)
  }

  const deleteSecondView = ({ calculateSecurities }: DeleteSecondViewProps) => {
    const tempSecurities = securitesOriginal.map(security => ({ ...security, view: 1 }))
    setActiveView(0)
    setSecuritiesOriginal([])
    calculateSecurities(tempSecurities, [])
  }

  const switchView = ({ securities, calculateSecurities, view }: SwitchViewProps) => {
    let tempSecurities: SecurityDto[] = []

    if (view === 1 && securitesV1.length === 0) {
      tempSecurities = securities.map(security => ({ ...security, view: 1 }))
      setSecuritiesOriginal(
        securities.map((security, index) => ({
          ...security,
          netPremiumAt100: securitesOriginal[index].netPremiumAt100,
          view: 2
        }))
      )
      setSecuritiesV1(tempSecurities)
    } else if (view === 1) {
      tempSecurities = securities.map(security => ({ ...security, view: 1 }))
      setSecuritiesV1(tempSecurities)
      setSecuritiesOriginal(
        securities.map((security, index) => ({
          ...security,
          netPremiumAt100: securitesOriginal[index].netPremiumAt100,
          view: 2
        }))
      )
    }

    setActiveView(view === 1 ? 2 : 1)
    calculateSecurities(
      view === 1 ? securitesOriginal : securitesV1.length === 0 ? securities : securitesV1,
      view === 2 ? (securitesV1.length === 0 ? securities : securitesV1) : []
    )
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
        switchView,
        securitesOriginal,
        createSecuritiesOriginal
      }}
    >
      {children}
    </SecondViewContext.Provider>
  )
}
