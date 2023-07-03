import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'

import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountsContext, IDiscountInputs } from '../discounts/DiscountsContext'

// import { SecurityContext } from '../../SecurityView'
import { usePercentageAchieved } from '../../hooks/usePercentageAchieved'
import { SecurityContext } from '../../SecurityView'

// ! only if we want specific props
interface DiscountPercentProps extends Omit<ISecurityInputProps, 'errorMessage'> {
  discountIndex: number
  operationSecurity: CalculateSecurity
  discountsList: IDiscountInputs[]
}

export const DiscountPercent = ({
  index,
  discountIndex,
  value,
  operationSecurity,
  discountsList
}: DiscountPercentProps) => {
  const { securities } = useContext(SecurityContext)
  const { achievedMessageError, checkIsPercentageAchieved } = usePercentageAchieved()

  const { updateDiscountByIndex } = useContext(DiscountsContext)
  const handleChangeDiscountPercent = (value: number) => {
    updateDiscountByIndex({
      index: discountIndex,
      percentage: value,
      amount: operationSecurity.getDiscountAmount(value)
    })
  }

  useEffect(() => {
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsList[discountIndex]])

  // * Si el campo ya cuenta con un mensaje de error, se ejecuta el chequeo de porcentaje
  // * alcanzado, esto con el fin de que el mensaje de error se borre para este campo
  // * en caso de que el porcentaje se disminuya desde otro lugar
  useEffect(() => {
    if (!achievedMessageError) return
    checkIsPercentageAchieved({ formIndex: index })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securities[index]])

  return (
    <FormControl fullWidth>
      <NumericFormat
        autoFocus
        label='Discount %'
        value={value}
        onChange={e => {
          handleChangeDiscountPercent(Number(e.target.value.replace('%', '')))
        }}
        suffix={'%'}
        customInput={TextField}
        decimalScale={2}
        isAllowed={values => {
          return (values.floatValue! >= 0 && values.floatValue! <= 100) || values.floatValue === undefined
        }}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {achievedMessageError ? achievedMessageError : ''}
      </FormHelperText>
    </FormControl>
  )
}
