import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReactNode, useRef, useState } from 'react'
import { CreateSecondViewProps, DeleteSecondViewProps, SecondViewContext, SwitchViewProps } from './SecondViewContext'

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalUndo, setIsOpenModalUndo] = useState<boolean>(false)
  const [activeView, setActiveView] = useState(0)
  const [securitesOriginal, setSecuritiesOriginal] = useState<SecurityDto[]>([])
  const [securitesView1, setSecuritiesView1] = useState<SecurityDto[]>([])

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
  const createSecuritiesOriginal = (security: SecurityDto) => {
    securitesOriginal.push({ ...security, view: 2 })
  }
  const updateSecuritiesView1 = (securities: SecurityDto[]) => {
    setSecuritiesView1(() => securities)
  }
  const updateSecuritiesOriginal = (securities: SecurityDto[]) => {
    setSecuritiesOriginal(() => securities)
  }

  const createSecondView = ({ securities, calculateSecurities }: CreateSecondViewProps) => {
    const tempSecurities = securities.map(security => ({ ...security, view: 2 }))
    setActiveView(1)

    securitesOriginal.length === 0 && setSecuritiesOriginal(tempSecurities)

    calculateSecurities(securities, securitesOriginal.length === 0 ? tempSecurities : securitesOriginal)
    setSecuritiesView1(securities)
  }

  const deleteSecondView = ({ calculateSecurities }: DeleteSecondViewProps) => {
    const tempSecurities = securitesOriginal.map(security => ({ ...security, view: 1 }))
    setActiveView(0)
    setSecuritiesOriginal([])
    calculateSecurities(tempSecurities, [])
  }

  const switchView = ({ securities, calculateSecurities, view }: SwitchViewProps) => {
    let tempSecurities: SecurityDto[] = []
    let tempSecuritiesOrigin: SecurityDto[] = []
    tempSecurities = securities.map(security => ({ ...security, view: 1 }))

    if (view === 1) {
      if (securitesOriginal.length > 0) {
        tempSecuritiesOrigin = securities.map((security, index) => ({
          ...security,
          netPremiumAt100: securitesOriginal[index].netPremiumAt100,
          view: 2
        }))

        //se alamancena los datos nuevos de la primera vista pero conservando el valor  netPremiumAt100 original
        setSecuritiesOriginal([...tempSecuritiesOrigin])
      }
      setSecuritiesView1([...tempSecurities])
    }

    setActiveView(view === 1 ? 2 : 1)
    calculateSecurities(view === 1 ? securitesOriginal : securitesView1, view === 1 ? [] : securitesOriginal)
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
        securitesView1,
        createSecuritiesOriginal,
        updateSecuritiesView1,
        updateSecuritiesOriginal
      }}
    >
      {children}
    </SecondViewContext.Provider>
  )
}
