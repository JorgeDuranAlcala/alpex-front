import { notNull } from '@/views/arap/_commons/utils/notNull';
import { ReinsurerInfo } from "../../../interfaces/reinsurerInfo";
import { GetPayableReinsuredIdResponseDto } from "../getPayableReinsurerIdResponse.dto";


export const payableReinsuranceIdAdapter = (data: GetPayableReinsuredIdResponseDto): ReinsurerInfo => {

  //Todo: capturar selected_payment_shcedule de la respuesta
  return {
    logo_url:  notNull(data.ReinsurerInfo[0].logourl || null),
    name: data.ReinsurerInfo[0].name,
    address_string: notNull(data.ReinsurerInfo[0].address || null),
    phone: notNull(data.ReinsurerInfo[0].phone || null),
    email: notNull(data.ReinsurerInfo[0].email || null),
    selected_payment_schedule: 'monthly'

  }
}