import { DifferenceGrid } from "../../../interfaces/overview/DifferenceGrid";
import { GetOverviewDifferenceAllResponseDto } from "../getOverviewDifferenceAllResponse.dto";

interface QueriesProps {
  totalAmount: number;
  currency: string;
}

export const overviewDifferencesAdapter = (data: GetOverviewDifferenceAllResponseDto, {totalAmount, currency}: QueriesProps): DifferenceGrid => {

  return {
    differenceGridList: data.results.map(result => {
      return {
        amount_received: result.amountReceived ? +result.amountReceived: 0,
        currency: result.currency,
        capability_name: result.capabilityName ? result.capabilityName : result.broker || 'unkown',
        pmt_date: new Date(result.pmtDate).toLocaleDateString('en-CA', {
          year: 'numeric',
          day: '2-digit',
          month: '2-digit'
        }),
        account: result.account,
        origin_acct: result.originAcct || '',
        deposit_acct: result.depositAcc || '',
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