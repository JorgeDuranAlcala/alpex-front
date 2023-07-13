import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { useAppDispatch } from '@/store'
import { usePercentageAchieved } from '../../../hooks/usePercentageAchieved'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { Security, updateSecuritiesAtIndex } from '../../../store/securitySlice'
import { CalculateSecurity } from '../../../utils/calculates-securities'

// ! only if we want specific props
interface TaxesPercentProps extends ISecurityInputProps {
  security: Security;
  operationSecurity: CalculateSecurity;
}

export const TaxesPercent = ({
  index,
  value,
  isDisabled,
  errorMessage,
  isActiveErrors,

  // operationSecurity,

  security,
}: TaxesPercentProps) => {

  const { achievedMessageError, checkIsPercentageAchieved } = usePercentageAchieved()

  const dispatch = useAppDispatch();


  const handleChangeTaxesPercent = (value: number) => {
    // taxesAmount: operationSecurity.getTaxesAmount(value)

    dispatch(updateSecuritiesAtIndex({
      index,
      security: {
        taxes: value,
      } as SecurityDto
    }))
  }

  useEffect(() => {
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security.taxes])

  // * Si el campo ya cuenta con un mensaje de error, se ejecuta el chequeo de porcentaje
  // * alcanzado, esto con el fin de que el mensaje de error se borre para este campo
  // * en caso de que el porcentaje se disminuya desde otro lugar
  useEffect(() => {
    if (!achievedMessageError) return
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security])

  // console.log({ isTacesTouxhes: forTaxes.current.isTouched, value })

  return (
    <FormControl fullWidth>
      <NumericFormat
        autoFocus
        label='Taxes %'
        value={value}
        onChange={e => {
          handleChangeTaxesPercent(Number(e.target.value.replace('%', '')))
        }}
        suffix={'%'}
        customInput={TextField}
        decimalScale={2}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
        disabled={isDisabled}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}>
        {isActiveErrors ? errorMessage : achievedMessageError}
      </FormHelperText>
    </FormControl>
  )
}

export const taxesPercent_validations = ({ isGross, isTaxesEnabled }: { isGross: boolean; isTaxesEnabled: boolean }) =>
  yup.object().shape({
    taxes: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        if (isGross && isTaxesEnabled) return +val > 0

        return true
      })
      .max(100)
  })