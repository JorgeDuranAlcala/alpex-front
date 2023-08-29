import { useState } from "react";
import { paymentsHistory as paymentsHistoryMock } from "../../mocks/paymentsHistory_mock";
import { PaymentsHistory } from "../interfaces/payments/paymentsHistory";


export const useGetPaymentsHistory = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [paymentsHistory, setPaymentsHistory] = useState<PaymentsHistory | null>(null)

  const getPaymentsHistoryByTransactionId = async (transactionId: string) => {
    setIsLoading(true);

    setTimeout(() => {
      console.log(transactionId);
      setPaymentsHistory(paymentsHistoryMock);
      setIsLoading(false);
    }, 1000);
  }

  return {
    isLoading,
    paymentsHistory,
    getPaymentsHistoryByTransactionId
  }

}
