import { ARAPCapabilityName } from "../interfaces/QueryFilters";

interface OptionsARAPCapabilityNameProps {
  value: ARAPCapabilityName;
  text: string;
}

export const OptionsARAPCapabilityName: OptionsARAPCapabilityNameProps[] = [{
  value: 'broker',
  text: 'Broker',
}, {
  value: 'reinsurer',
  text: 'Reinsurer',
}]
