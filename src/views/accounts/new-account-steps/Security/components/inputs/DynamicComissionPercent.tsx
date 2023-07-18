import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

// ! only if we want specific props
// interface DynamicComissionPercentProps extends ISecurityInputProps {
//
// }

type DynamicComissionPercentProps = ISecurityInputProps

export const DynamicComissionPercent = ({
  index,
  value,
  errorMessage,
  validateForm,
  view
}: DynamicComissionPercentProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeDynamicComissionPercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      dynamicCommission: value,
      dynamicCommissionAmount: 0
    }

    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Dynamic comission %'
        value={Number(value)}
        onValueChange={value => {
          handleChangeDynamicComissionPercent(Number(value.floatValue))
        }}
        suffix={'%'}
        customInput={TextField}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
        disabled={view === 2}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const dynamicComissionPercent_validations = () =>
  yup.object().shape({
    dynamicCommission: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .required('This field is required')
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })

      .max(100)
  })
