
import { AccountingStructure } from "@/views/arap/_commons/interfaces/AccountingStructure";
import { AccountingStructureResponseDto } from "../getPayableReinsurerIdResponse.dto";


export const payableReinsuranceAccountingStructureAdapter = (data: AccountingStructureResponseDto): AccountingStructure => {

  return {
    date: data.date,
    netPremiumReinsurance: +data.netPremiumReinsurance,
    netPremium: +data.netPremium,
    taxesAmount: +data.taxesAmount,
    taxesPercent: +data.taxesPercent,
    reinsuranceBrokerageAmount: +data.reinsuranceBrokerageAmount,
    reinsuranceBrokeragePercent: +data.reinsuranceBrokeragePercent,
    frontingFeeAmount: +data.frontingFeeAmount,
    frontingFeePercent: +data.frontingFeePercent,
    discountsAmount: +data.discountsAmount,
    discountsPercent: +data.discountsPercent,
    dynamicCommissionAmount: +data.dynamicCommissionAmount,
    dynamicCommissionPercent: +data.dynamicCommissionPercent
  }
}