import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { useAppDispatch } from '@/store'
import SwitchAlpex from '@/views/custom/switchs'
import { FormControl } from '@mui/material'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { Security, updateSecuritiesAtIndex } from '../../../store/securitySlice'

interface SwitchFrontingFeeProps extends Omit<ISecurityInputProps, 'value' | 'errorMessage'> {
  isChecked: boolean
  security: SecurityDto
}

export const SwitchFrontingFee = ({
  index,
  security,
  isChecked,
  isDisabled
}: SwitchFrontingFeeProps) => {


  const dispatch = useAppDispatch();

  const handleSwitch = () => {

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        frontingFeeActive: !security.frontingFeeActive,
        isTouchedFrontingFee: true,
        isTouchedFrontingFeeAmount: true,
        isFrontingFeeEnabled: !security.frontingFeeActive,
      } as Security
    }))
  }

  return (
    <FormControl fullWidth sx={{ mb: 6 }}>
      <div>
        <span className='switch-text'>Fronting fee </span>
        <SwitchAlpex checked={isChecked} onClick={handleSwitch}
          disabled={isDisabled} />
      </div>
    </FormControl>
  )
}
