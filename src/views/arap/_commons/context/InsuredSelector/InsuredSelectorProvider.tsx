import { insured_options_mock } from '@/views/arap/mocks/insured_options_mock'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { InsuredBy } from '../../interfaces/InsuredBy.type'
import { InsuredOption } from '../../interfaces/InsuredOption'
import { InsuredSelectorContext } from './InsuredSelectorContext'

export const InsuredSelectorProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [insuredOptions, setInsuredOptions] = useState<InsuredOption[]>([])
  const [selectedInsuredId, setSelectedInsuredId] = useState<number | null>(null)

  const loadInsureds = (by: InsuredBy) => {
    const { id } = router.query
    if (!id) return

    setIsLoading(true)

    switch (by) {
      // * Obtener "Insureds" ligados al "Reinsurer ID" (sección/pantalla Payable)
      case 'reinsurer':
        // Todo: const reinsurerId = id;
        // Todo: reemplazar este timeout por el servicio que se implementara
        setTimeout(() => {
          setInsuredOptions(insured_options_mock)
          setIsLoading(false)
        }, 500)

        break

      // * Obtener "Insureds" ligados al "Broker ID" (sección/pantalla Receivable)
      case 'broker':
        // Todo: const brokerId = id;
        // Todo: reemplazar este timeout por el servicio que se implementara
        setTimeout(() => {
          setInsuredOptions(insured_options_mock)
          setIsLoading(false)
        }, 500)

        break

      default:
        break
    }
  }

  const handleOnChangeInsured = (id: number) => {
    setSelectedInsuredId(id)
  }

  return (
    <InsuredSelectorContext.Provider
      value={{
        isLoading,
        insuredOptions,
        selectedInsuredId,
        loadInsureds,
        handleOnChangeInsured
      }}
    >
      {children}
    </InsuredSelectorContext.Provider>
  )
}
