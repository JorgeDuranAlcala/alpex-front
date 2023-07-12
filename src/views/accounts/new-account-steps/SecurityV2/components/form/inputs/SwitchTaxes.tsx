import { useAppDispatch } from '@/store'
import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { Security, updateSecuritiesAtIndex } from '../../../store/securitySlice'

interface SwitchTaxesProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean
}

export const SwitchTaxes = ({
  index,
  isChecked,
  isDisabled,
}: SwitchTaxesProps) => {

  const dispatch = useAppDispatch();

  const handleSwitch = () => {

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        taxesActive: !isChecked,
        isTaxesEnabled: !isChecked,
        isTouchedTaxes: true,
        isTouchedTaxesAmount: true,
      } as Security
    }))
  }

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Taxes </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch}
          disabled={isDisabled} />
      </div>
    </FormControl>
  )
}
