import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { SetStateAction, useContext } from 'react'
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SwitchFrontingFeeProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean
  security: SecurityDto
  setFrontingFeeEnabled: (value: SetStateAction<boolean>) => void
}

export const SwitchFrontingFee = ({
  index,
  validateForm,
  security,
  isChecked,
  setFrontingFeeEnabled
}: SwitchFrontingFeeProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)

  const handleSwitch = () => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],

      // idCRetroCedant: {} as RetroCedantDto,
      // idCRetroCedantContact: {} as RetroCedantContactDto,

      // frontingFee: Number(null),
      // frontingFeeAmount: Number(null),
      frontingFeeActive: !security.frontingFeeActive
    }
    setFrontingFeeEnabled(() => !security.frontingFeeActive)
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Fronting fee </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch} />
      </div>
    </FormControl>
  )
}
