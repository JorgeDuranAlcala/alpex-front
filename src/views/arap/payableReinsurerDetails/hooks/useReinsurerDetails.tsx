import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { InsuredSelectorContext } from '../../_commons/context/InsuredSelector/InsuredSelectorContext'
import { ReinsurerInfo } from '../interfaces/reinsurerInfo'
import { payableReinsuranceAccountingStructureAdapter } from '../services/getPayableReinsurerId/frontAdapters/payableReinsuranceAccountingStructureAdapter'
import { payableReinsuranceEstructureInfoAdapter } from '../services/getPayableReinsurerId/frontAdapters/payableReinsuranceEstrctureInfoAdapter'
import { payableReinsuranceIdAdapter } from '../services/getPayableReinsurerId/frontAdapters/payableReinsuranceIdAdapter'
import { getPayableReinsuredIdService } from '../services/getPayableReinsurerId/getPayableReinsuredIdService'

export const useReinsurerDetails = () => {

  // ! INIT implementación temporal, se esperaba un servicio separado
  const {TEMP_loadAccountingStructures} = useContext(InsuredSelectorContext);
  
  // ! END implementación temporal

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [reinsurerDetails, setReinsurerDetails] = useState<ReinsurerInfo | null>(null)

  const { id } = router.query

  const getPayableReinsuranceIdAsync = async (id:number) => {
    const reinsuredInfo = await getPayableReinsuredIdService({capabilityId: +id})

    const reinsuredDetailsAdapted = payableReinsuranceIdAdapter(reinsuredInfo)
    console.log('reinsuredDetailsAdapted', reinsuredDetailsAdapted)
    setReinsurerDetails(reinsuredDetailsAdapted)
    setIsLoading(false)


    // ! INIT implementación temporal
    const estructureInfo = payableReinsuranceEstructureInfoAdapter(reinsuredInfo)

    const accountingStructuresAdapted = estructureInfo.map(item => ({
      insuredId: item.insuredId,
      insuredName: item.insuredName,
      ...payableReinsuranceAccountingStructureAdapter(item.AccountingStructure)
    }));

    TEMP_loadAccountingStructures(accountingStructuresAdapted);

    // ! END implementación temporal
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      if (!isLoading) {
        console.log('id', id)
          getPayableReinsuranceIdAsync(+id)
      }
    }
  }, [id])

  return {
    isLoading,
    reinsurerDetails
  }
}
