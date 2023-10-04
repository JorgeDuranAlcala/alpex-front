import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { InsuredSelectorContext } from '../../_commons/context/InsuredSelector/InsuredSelectorContext'
import { BrokerInfo } from '../interfaces/brokerInfo'
import { receivableBrokerIdAdapter } from '../services/getReceivableBrokerId/frontAdapters/ReceivableBrokerIdAdapter'
import { receivableBrokerAccountingStructureAdapter } from '../services/getReceivableBrokerId/frontAdapters/receivableBrokerAccountingStructureAdapter'
import { receivableBrokerPaymentInstallmentsAdapter } from '../services/getReceivableBrokerId/frontAdapters/receivableBrokerPaymentInstallmentsAdapter'
import { receivableBrokerEstructureInfoAdapter } from '../services/getReceivableBrokerId/frontAdapters/receivasbleBrokerEstrctureInfoAdapter'
import { getReceivableBrokerIdService } from '../services/getReceivableBrokerId/getReceivableBrokerIdService'

export const useBrokerDetails = () => {

  // ! INIT implementación temporal, se esperaba un servicio separado
  const {TEMP_loadAccountingStructures, TEMP_loadPaymentInstallments} = useContext(InsuredSelectorContext);
  
  // ! END implementación temporal

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [brokerDetails, setBrokerDetails] = useState<BrokerInfo | null>(null)

  const { id } = router.query

  const getReceivableBrokerIdAsync = async (id:number) => {
    const brokerInfo = await getReceivableBrokerIdService({capabilityId: +id})

    const brokerDetailsAdapted = receivableBrokerIdAdapter(brokerInfo)
    setBrokerDetails(brokerDetailsAdapted)
    setIsLoading(false)

    // ! INIT implementación temporal
    const estructureInfo = receivableBrokerEstructureInfoAdapter(brokerInfo)

    const accountingStructuresAdapted = estructureInfo.map(item => ({
      insuredId: item.insuredId,
      insuredName: item.insuredName,
      ...receivableBrokerAccountingStructureAdapter(item.AccountingStructure)
    }));

    TEMP_loadAccountingStructures(accountingStructuresAdapted);

    const paymentInstallmentsAdapted = estructureInfo.map(item => ({
      insuredId: item.insuredId,
      paymentInstallments: receivableBrokerPaymentInstallmentsAdapter(item.infoInstallment)
    }))

    TEMP_loadPaymentInstallments(paymentInstallmentsAdapted);
    
    // ! END implementación temporal

  }

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      if (!isLoading) {
        getReceivableBrokerIdAsync(+id)
      }
    }
  }, [id])

  return {
    isLoading,
    brokerDetails
  }
}
