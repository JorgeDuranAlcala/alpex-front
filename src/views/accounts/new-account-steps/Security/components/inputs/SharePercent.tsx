import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface SharePercentProps extends ISecurityInputProps {
  view: number
}

export const SharePercent = ({ index, value, errorMessage, validateForm, view }: SharePercentProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeSharePercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      share: value
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Share %'
        value={Number(Number(value).toFixed(2))}
        onValueChange={value => {
          handleChangeSharePercent(Number(value.floatValue))
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

export const sharePercent_validations = () =>
  yup.object().shape({
    share: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .min(0)
      .max(100)
      .required('This field is required')
  })
