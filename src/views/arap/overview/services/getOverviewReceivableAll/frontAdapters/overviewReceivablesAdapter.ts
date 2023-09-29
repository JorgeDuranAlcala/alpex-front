import { ReceivableGrid } from "../../../interfaces/overview/ReceivableGrid";
import { GetOverviewReceivableAllResponseDto } from "../getOverviewReceivableAllResponse.dto";

interface QueriesProps {
  totalAmount: number;
  currency: string;
}

export const overviewReceivablesAdapter = (data: GetOverviewReceivableAllResponseDto, {totalAmount, currency}: QueriesProps): ReceivableGrid => {

  return {
    receivableGridList: data.results.map(result => {
      return {
        amount_received: +result.amountReceived,
        currency: result.currency,
        broker: result.broker,
        pmt_date: new Date(result.pmtDate).toLocaleDateString('en-CA', {
          year: 'numeric',
          day: '2-digit',
          month: '2-digit'
        }),
        account: result.account,
        inst: result.inst,
        deposit_acc:  +result.depositAcc,
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