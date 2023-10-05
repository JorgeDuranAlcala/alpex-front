import { notNull } from '@/views/arap/_commons/utils/notNull';
import { BrokerInfo } from "../../../interfaces/brokerInfo";
import { GetReceivableBrokerIdResponseDto } from "../getReceivableBrokerIdResponse.dto";


export const receivableBrokerIdAdapter = (data: GetReceivableBrokerIdResponseDto): BrokerInfo => {

  //Todo: capturar selected_payment_shcedule de la respuesta
  return {
    logo_url:  notNull(data.BrokerInfo[0].logourl || null),
    name: data.BrokerInfo[0].name,
    address_string: notNull(data.BrokerInfo[0].address || null),
    phone: notNull(data.BrokerInfo[0].phone || null),
    email: notNull(data.BrokerInfo[0].email || null),
    selected_payment_schedule: 'monthly'

  }
}