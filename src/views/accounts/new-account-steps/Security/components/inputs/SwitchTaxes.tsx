import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { MutableRefObject, SetStateAction, useContext } from 'react'
import { SecurityContext } from '../../SecurityView'
import { IForField } from '../../hooks/useDataFirstTime'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SwitchTaxesProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean
  security: SecurityDto
  fieldRef: MutableRefObject<IForField>
  setIsTaxesEnabled: (value: SetStateAction<boolean>) => void
}

export const SwitchTaxes = ({
  index,
  validateForm,
  security,
  isChecked,
  setIsTaxesEnabled,
  fieldRef
}: SwitchTaxesProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)

  const handleSwitch = () => {
    console.log({ security })
    if (fieldRef) {
      fieldRef.current.isTouched = true
    }
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxesActive: !isChecked

      // idCRetroCedant: {} as RetroCedantDto,
      // idCRetroCedantContact: {} as RetroCedantContactDto,
      // frontingFee: Number(null),
      // frontingFeeAmount: Number(null),
      // frontingFeeActive: !security.frontingFeeActive
    }
    setIsTaxesEnabled(() => !isChecked)
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Taxes </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch} />
      </div>
    </FormControl>
  )
}
