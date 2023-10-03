
import { PaymentInstallment } from "@/views/arap/_commons/interfaces/PaymentInstallment";
import { PaymentInstallmentResponseDto } from "../getReceivableBrokerIdResponse.dto";


export const receivableBrokerPaymentInstallmentsAdapter = (data: PaymentInstallmentResponseDto[]): PaymentInstallment[] => {

  return data.map(item => {
    
    return {
    premiumPaymentWarranty: item.premiumPaymentWarranty,
    paymentPercent: +item.paymentPercentage,
    balanceDue:   +item.balanceDue,
    settlementDueDate: new Date(item.settlementDueDate),
  }})
}