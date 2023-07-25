import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

type PremiumPerShareAmountProps = ISecurityInputProps

export const PremiumPerShareAmount = ({
  index,
  value,
  errorMessage,
  validateForm,
  view
}: PremiumPerShareAmountProps) => {
  const { activeErros, securities } = useContext(SecurityContext)

  const handleChangePremiumPerShareAmount = (value: number) => {
    //todo @omar persistir valor
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      premiumPerShareAmount: value,
      isChangeBrokerAgeAmount: false,
      isChangeFrontingFeeAmount: false,
      isChangeTaxesAmount: false,
      isChangeDynamicCommissionAmount: false,
      discounts: tempSecurities[index].discounts.map(discount => ({ ...discount, isChangeAmount: false }))
    }
    validateForm(tempSecurities[index])

    // calculateSecurities(tempSecurities)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        autoFocus
        label='Premium per share'
        value={value}
        onChange={e => {
          handleChangePremiumPerShareAmount(Number(e.target.value))
        }}
        prefix={'$'}
        customInput={TextField}
        thousandSeparator=','
        disabled={view === 2}
      />
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const premiumPerShareAmount_validations = () =>
  yup.object().shape({
    premiumPerShareAmount: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required')
  })
