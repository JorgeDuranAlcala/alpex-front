import { PaymentScheduleOption } from "../../_commons/interfaces/PaymentScheduleOption";

export interface ReinsurerInfo {
  logo_url: null | string
  name: string
  address_string: string | null;
  phone: string | null;
  email: string | null;
  selected_payment_schedule: PaymentScheduleOption
}
