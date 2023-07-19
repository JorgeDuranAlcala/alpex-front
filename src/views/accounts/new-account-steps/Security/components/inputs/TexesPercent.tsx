import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { usePercentageAchieved } from '../../hooks/usePercentageAchieved'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

// ! only if we want specific props
interface TaxesPercentProps extends ISecurityInputProps {
  operationSecurity?: CalculateSecurity
  isDisabled: boolean
}

export const TaxesPercent = ({
  index,
  value,
  isDisabled,
  errorMessage,
  validateForm,

  view
}: TaxesPercentProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const { achievedMessageError, checkIsPercentageAchieved } = usePercentageAchieved()

  const handleChangeTaxesPercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      taxes: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  useEffect(() => {
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // * Si el campo ya cuenta con un mensaje de error, se ejecuta el chequeo de porcentaje
  // * alcanzado, esto con el fin de que el mensaje de error se borre para este campo
  // * en caso de que el porcentaje se disminuya desde otro lugar
  useEffect(() => {
    if (!achievedMessageError) return
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <FormControl fullWidth>
      <NumericFormat
        autoFocus
        label='Taxes %'
        value={Number(Number(value).toFixed(2))}
        onChange={e => {
          handleChangeTaxesPercent(Number(e.target.value.replace('%', '')))
        }}
        suffix={'%'}
        customInput={TextField}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
        disabled={view === 2 || isDisabled}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '25px' }}>
        {activeErros ? errorMessage : achievedMessageError}
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
