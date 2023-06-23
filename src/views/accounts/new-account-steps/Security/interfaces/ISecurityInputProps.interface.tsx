import { SecurityDto } from "@/services/accounts/dtos/security.dto";

export interface ISecurityInputProps {

  index: number;
  value: number | string;
  isError: boolean;
  isDisabled?: boolean;
  validateForm: (securityParam: SecurityDto) => void;
}
