
import { GetReceivableBrokerIdResponseDto } from "../getReceivableBrokerIdResponse.dto";

export const receivableBrokerEstructureInfoAdapter = (data: GetReceivableBrokerIdResponseDto): GetReceivableBrokerIdResponseDto['BrokerEstructureInfo'] => {

  return data.BrokerEstructureInfo
}