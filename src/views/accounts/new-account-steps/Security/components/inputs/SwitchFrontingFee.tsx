import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { MutableRefObject, SetStateAction, useContext } from 'react'
import { SecurityContext } from '../../SecurityView'
import { IForField } from '../../hooks/useDataFirstTime'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SwitchFrontingFeeProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean
  security: SecurityDto
  setFrontingFeeEnabled: (value: SetStateAction<boolean>) => void
  fieldRef?: MutableRefObject<IForField>
}

export const SwitchFrontingFee = ({
  index,
  validateForm,
  security,
  isChecked,
  setFrontingFeeEnabled,
  view
}: SwitchFrontingFeeProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)

  const handleSwitch = () => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index]
    }
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFeeActive: !isChecked,
      frontingFee: !isChecked ? 0 : tempSecurities[index].frontingFee,
      frontingFeeAmount: !isChecked ? 0 : tempSecurities[index].frontingFeeAmount
    }
    setFrontingFeeEnabled(() => !isChecked)
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Fronting fee </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch} disabled={view === 2} />
      </div>
    </FormControl>
  )
}
