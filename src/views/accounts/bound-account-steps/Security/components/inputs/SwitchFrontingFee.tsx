import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { SetStateAction, useContext } from 'react'
import { SecurityContext } from '../../SecurityViewBound'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SwitchFrontingFeeProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean

  setFrontingFeeEnabled: (value: SetStateAction<boolean>) => void
}

export const SwitchFrontingFee = ({
  index,
  validateForm,

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
      frontingFee: !isChecked ? tempSecurities[index].frontingFee : 0,
      frontingFeeAmount: !isChecked ? tempSecurities[index].frontingFeeAmount : 0
    }
    validateForm(tempSecurities[index])
    setFrontingFeeEnabled(() => !isChecked)
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
