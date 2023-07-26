import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { SetStateAction, useContext } from 'react'
import { SecurityContext } from '../../SecurityViewBound'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SwitchTaxesProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean
  security?: SecurityDto

  setIsTaxesEnabled: (value: SetStateAction<boolean>) => void
}

export const SwitchTaxes = ({ index, validateForm, isChecked, setIsTaxesEnabled, view }: SwitchTaxesProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)

  const handleSwitch = () => {
    const tempSecurities = [...securities]

    tempSecurities[index] = {
      ...tempSecurities[index],
      taxesActive: !isChecked,
      taxes: !isChecked ? tempSecurities[index].taxes : 0,
      taxesAmount: !isChecked ? tempSecurities[index].taxesAmount : 0
    }
    setIsTaxesEnabled(() => !isChecked)
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Taxes </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch} disabled={view === 2} />
      </div>
    </FormControl>
  )
}
