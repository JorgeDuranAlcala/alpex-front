import { ARAPTransaction } from "../interfaces/QueryFilters";

interface OptionsARAPTransactionProps {
  value: ARAPTransaction;
  text: string;
}

export const OptionsARAPTransaction: OptionsARAPTransactionProps[] = [{
  value: 'claim',
  text: 'Claim',
}, {
  value: 'reinsurer pay',
  text: 'Reinsurer Pay',
}, {
  value: 'broker pay',
  text: 'Broker Pay',
}]