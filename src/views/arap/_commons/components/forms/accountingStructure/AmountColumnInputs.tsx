import { ColumnInputsContainer } from '../../../styles/FormsDetails'
import { TextBody1_Semibold } from '../../../styles/TextBody1_Semibold'
import { DisabledTextField } from '../../inputs/DisabledTextField'

interface AmountColumnInputsProps {
  label: string
  amountValue: string | number
  percentValue: string | number
}
export const AmountColumnInputs = ({ label, amountValue, percentValue }: AmountColumnInputsProps) => {
  return (
    <ColumnInputsContainer>
      <TextBody1_Semibold>{label}</TextBody1_Semibold>
      <DisabledTextField label={`${label} %`} value={`${percentValue} %`} />
      <DisabledTextField
        label={label}
        value={`$${amountValue.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`}
      />
    </ColumnInputsContainer>
  )
}
