
import { GetPayableReinsuredIdResponseDto } from "../getPayableReinsurerIdResponse.dto";


export const payableReinsuranceEstructureInfoAdapter = (data: GetPayableReinsuredIdResponseDto): GetPayableReinsuredIdResponseDto['ReinsurerEstructureInfo'] => {

  return data.ReinsurerEstructureInfo
}