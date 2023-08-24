import { ARAPStatus } from "../interfaces/QueryFilters";

interface OptionsARAPStatusProps {
  value: ARAPStatus;
  text: string;
}

export const OptionsARAPStatus: OptionsARAPStatusProps[] = [{
  value: 'pending',
  text: 'Pending',
}, {
  value: 'paid',
  text: 'Paid',
}, {
  value: 'unpaid',
  text: 'Unpaid',
}]