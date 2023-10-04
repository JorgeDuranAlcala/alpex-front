import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { InsuredBy } from '../../interfaces/InsuredBy.type'
import { InsuredOption } from '../../interfaces/InsuredOption'
import { InsuredSelectorContext, TEMP_AccountingStructure, TEMP_PaymentInstallment } from './InsuredSelectorContext'

export const InsuredSelectorProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [insuredOptions, setInsuredOptions] = useState<InsuredOption[]>([])
  const [selectedInsuredId, setSelectedInsuredId] = useState<number | null>(null)
  
  
  // ! Se esperaba un servicio, pero los datos de los insured llegan en el mismo 
  // ! endpoint de información en forma de array. Por eso se crea esta función y
  // ! estado temporal para no modificar la funcionalidad del front.
  
  // ! Se recomienda seprarar las opciones y AccountingStructure en un servicio
  // ! aparte porque pueden llegar arreglos muy pesados que ralentizarán la 
  // ! carga de la primera consulta siempre que se inicie el componente.
  
  const [TEMP_accountingStructures, TEMP_setAccountingStructures] = useState<TEMP_AccountingStructure[]>([])
  const [TEMP_paymentInstallments, TEMP_setPaymentInstallments] = useState<TEMP_PaymentInstallment[]>([])
  
  const TEMP_loadAccountingStructures = (accountingStructures: TEMP_AccountingStructure[]) => {
    TEMP_setAccountingStructures(accountingStructures)
    TEMP_loadInsuredOptions(accountingStructures.map(item => ({
      id: item.insuredId,
      name: item.insuredName
    })))
  }

  const TEMP_loadPaymentInstallments = (paymentInstallments: TEMP_PaymentInstallment[]) => {
    TEMP_setPaymentInstallments(paymentInstallments)
  }

  const TEMP_loadInsuredOptions = (insuredOptions: InsuredOption[]) => {
    setInsuredOptions(insuredOptions)
  }

  // ! END implementación temporal

  const loadInsureds = (by: InsuredBy) => {
    const { id } = router.query
    if (!id) return

    setIsLoading(true)

    switch (by) {
      // * Obtener "Insureds" ligados al "Reinsurer ID" (sección/pantalla Payable)
      case 'reinsurer':
        
        setIsLoading(false);
        
        // Todo: const reinsurerId = id;
        // Todo: reemplazar este timeout por el servicio que se implementara
        // setTimeout(() => {
        //   setInsuredOptions(insured_options_mock)
        //   setIsLoading(false)
        // }, 500)

        break

      // * Obtener "Insureds" ligados al "Broker ID" (sección/pantalla Receivable)
      case 'broker':
        setIsLoading(false);
        
        // Todo: const brokerId = id;
        // Todo: reemplazar este timeout por el servicio que se implementara
        // setTimeout(() => {
        //   setInsuredOptions(insured_options_mock)
        //   setIsLoading(false)
        // }, 500)

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
        handleOnChangeInsured,

        TEMP_accountingStructures,
        TEMP_loadAccountingStructures,

        TEMP_paymentInstallments,
        TEMP_loadPaymentInstallments
      }}
    >
      {children}
    </InsuredSelectorContext.Provider>
  )
}
