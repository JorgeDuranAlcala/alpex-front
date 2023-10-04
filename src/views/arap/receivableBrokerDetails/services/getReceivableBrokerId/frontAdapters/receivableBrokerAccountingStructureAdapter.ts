
import { AccountingStructure } from "@/views/arap/_commons/interfaces/AccountingStructure";
import { AccountingStructureResponseDto } from "../getReceivableBrokerIdResponse.dto";


export const receivableBrokerAccountingStructureAdapter = (data: AccountingStructureResponseDto): AccountingStructure => {

  return {
    date: data.date,

    netPremiumReinsurance: data.netPremiumReinsurance ? +data.netPremiumReinsurance : 0,
    netPremium: +data.netPremium,
    taxesAmount: +data.taxesAmount,
    taxesPercent: +data.taxesPercent,
    reinsuranceBrokerageAmount: +data.reinsuranceBrokerageAmount,
    reinsuranceBrokeragePercent: +data.reinsuranceBrokeragePercent,
    frontingFeeAmount: +data.frontingFeeAmount,
    frontingFeePercent: +data.frontingFeePercent,
    discountsAmount: +data.discountsAmount,
    discountsPercent: +data.discountsPercent,

    dynamicCommissionAmount: data.dynamicCommissionAmount ? +data.dynamicCommissionAmount : 0,
    dynamicCommissionPercent: data.dynamicCommissionPercent ? +data.dynamicCommissionPercent : 0,
  }
}