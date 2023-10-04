import { useContext, useState } from 'react';
import { InsuredSelectorContext } from '../context/InsuredSelector/InsuredSelectorContext';
import { PaymentInstallment } from '../interfaces/PaymentInstallment';

export const usePaymentInstallment = () => {

  
  // ! implementación temporal, se espera obtener la data de un servicio separado
  const {TEMP_paymentInstallments} = useContext(InsuredSelectorContext);

  const [isLoading, setIsLoading] = useState(false)
  const [installments, setInstallments] = useState<PaymentInstallment[]>([])

  const getDataByInsuredId = (insuredId: number) => {
    setIsLoading(true);

    console.log(insuredId);

    const installments = TEMP_paymentInstallments.find((installment) => installment.insuredId === insuredId);

    if (installments) {
      setInstallments(installments.paymentInstallments);
    }

    setIsLoading(false);

    // Todo: usar insuredId;
    // Todo: reemplazar este timeout por el servicio que se implementará
    // setTimeout(() => {
    //   setInstallments(payment_installments_mock)
    //   setIsLoading(false)
    // }, 1000)
  }

  return {
    isLoading,
    installments,
    getDataByInsuredId
  }
}
