import { SecurityDto } from '@/services/accounts/dtos/security.dto'

export interface ISecurityInputProps {
  index: number
  value: number | string
  errorMessage: string
  isDisabled?: boolean
  validateForm: (securityParam: SecurityDto) => void
  view: number
}
