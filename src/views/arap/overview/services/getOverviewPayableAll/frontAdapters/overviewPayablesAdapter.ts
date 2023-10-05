import { PayableGrid } from "../../../interfaces/overview/PayableGrid";
import { GetOverviewPayableAllResponseDto } from "../getOverviewPayableAllResponse.dto";

interface QueriesProps {
  totalAmount: number;
  currency: string;
}

export const overviewPayablesAdapter = (data: GetOverviewPayableAllResponseDto, {totalAmount, currency}: QueriesProps): PayableGrid => {

  return {
    payableGridList: data.results.map(result => {
      return {
        amount_paid: +result.amountPaid,
        currency: result.currency,
        capability_name: result.capabilityName,
        pmt_date: new Date(result.pmtDate).toLocaleDateString('en-CA', {
          year: 'numeric',
          day: '2-digit',
          month: '2-digit'
        }),  
        account: result.account,
        origin_acct: result.originAcct,
        transactionId: result.transactionId,
        user: result.user
      }
    }),
    isLoading: false,
    filters: [],
    info: {
      ...data.info
    },
      
    totalAmount: totalAmount,
    totalAmountCurrency: currency,
  }
}