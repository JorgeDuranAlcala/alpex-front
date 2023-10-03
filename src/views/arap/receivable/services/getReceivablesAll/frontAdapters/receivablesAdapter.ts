import { ReceivableGrid } from "../../../interfaces/ReceivableGrid";
import { GetReceivablesAllResponseDto } from "../getReceivablesAllResponse.dto";


export const receivablesAdapter = (data: GetReceivablesAllResponseDto): ReceivableGrid => {
const info: ReceivableGrid['info'] = {
    ...data.info,
  }

  return {
    receivableGridList: data.results.map(result => {
      

      return {
        ...result,
        account_id: result.accountId,
        capability_id: result.capabilityId,
        capability_name: result.capabilityName,
        total_debt: Number(result.totalDebt),
        paid_percent: Number(result.paidPercent),
        "0_30": Number(result["0a30"]),
        "31_60": Number(result["31a60"]),
        "61_90": Number(result["61a90"]),
        "91_120": Number(result["91a120"]),
        "120": Number(result["opc120"]),

        // transactionDate: new Date(result.).toISOString()
        // transactionDate: result.createdAt.toISOString().split('T')[0]
      }
    }),
    isLoading: false,
    filters: [],
    info: {
      ...info,
    }
  }


}