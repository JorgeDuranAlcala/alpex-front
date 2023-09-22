import { useState } from 'react'
import { payment_installments_mock } from '../../mocks/payment_installment_mock'
import { PaymentInstallment } from '../interfaces/PaymentInstallment'

export const usePaymentInstallment = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [installments, setInstallments] = useState<PaymentInstallment[]>([])

  const getDataByInsuredId = (insuredId: number) => {
    setIsLoading(true)

    console.log(insuredId)

    // Todo: usar insuredId;
    // Todo: reemplazar este timeout por el servicio que se implementará
    setTimeout(() => {
      setInstallments(payment_installments_mock)
      setIsLoading(false)
    }, 1000)
  }

  return {
    isLoading,
    installments,
    getDataByInsuredId
  }
}
