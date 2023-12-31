import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityViewBound'
import { usePercentageAchieved } from '../../hooks/usePercentageAchieved'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'

// ! only if we want specific props
interface FrontingFeePercentProps extends ISecurityInputProps {
  operationSecurity?: CalculateSecurity
  isDisabled: boolean
}

// type FrontingFeePercentProps = ISecurityInputProps;

export const FrontingFeePercent = ({
  index,
  value,
  isDisabled,
  errorMessage,
  validateForm,
  view
}: FrontingFeePercentProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const { achievedMessageError, checkIsPercentageAchieved } = usePercentageAchieved()

  const handleChangeFrontingFeePercent = (value: number) => {
    const tempSecurities = securities ? [...securities] : []
    tempSecurities[index] = {
      ...tempSecurities[index],
      frontingFee: value,
      isChangeFrontingFeeAmount: false
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  useEffect(() => {
    //TODO @OMAR REVISAR SU FUNCIONALIDAD DESPUES DE PRUEBA
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securities[index].frontingFee])

  // * Si el campo ya cuenta con un mensaje de error, se ejecuta el chequeo de porcentaje
  // * alcanzado, esto con el fin de que el mensaje de error se borre para este campo
  // * en caso de que el porcentaje se disminuya desde otro lugar
  useEffect(() => {
    //TODO @OMAR REVISAR SU FUNCIONALIDAD DESPUES DE PRUEBA
    if (!achievedMessageError) return
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securities[index]])

  return (
    <FormControl fullWidth>
      <NumericFormat
        autoFocus
        label='Fronting fee %'
        value={value}
        onChange={e => {
          handleChangeFrontingFeePercent(Number(e.target.value.replace('%', '')))
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

export const frontingFeePercent_validations = ({ frontingFeeEnabled }: { frontingFeeEnabled: boolean }) =>
  yup.object().shape({
    frontingFee: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (frontingFeeEnabled) return +val > 0

        return true
      })

      .max(100)
  })
