import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

// ! only if we want specific props
// interface ReinsuranceBrokeragePercentProps extends ISecurityInputProps {
//
// }

type ReinsuranceBrokeragePercentProps = ISecurityInputProps

export const ReinsuranceBrokeragePercent = ({
  index,
  value,
  errorMessage,
  validateForm,
  view
}: ReinsuranceBrokeragePercentProps) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeBrokerRagePercent = (value: number) => {
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      reinsuranceBrokerage: value,
      isChangeBrokerAgeAmount: false
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Reinsurance brokerage %'
        value={Number(value) ?? 0}
        onValueChange={value => {
          handleChangeBrokerRagePercent(Number(value.floatValue))
        }}
        defaultValue={0}
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

export const reinsuranceBrokeragePercent_validations = ({ isGross }: { isGross: boolean }) => {
  return yup.object().shape({
    reinsuranceBrokerage: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (isGross) return +val > 0

        return true
      })

      .max(100)
  })
}
