import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useContext, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'

import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'
import { SecondViewContext } from '../secondView/SecondViewContext'

interface GrossOrNetPremiumAt100Props extends ISecurityInputProps {
  isGross: boolean
}

export const GrossOrNetPremiumAt100 = ({
  index,
  isGross,
  value,
  errorMessage,
  validateForm,
  view
}: GrossOrNetPremiumAt100Props) => {
  const { activeErros, securities, calculateSecurities } = useContext(SecurityContext)

  const { activeView, $inputRef, openModalSecondView, isOpenModal, isOpenModalUndo } = useContext(SecondViewContext)

  // al hacer click en el input se desplega un modal para la visualizacion de la segunda vista
  const handleClick = (e: any) => {
    if (activeView === 0 || activeView === 3) {
      $inputRef[index] = e.target
      openModalSecondView()
    }
  }

  const handleChangeBaseAmount = (value: number) => {
    console.log('change gross or net at 100%')
    const tempSecurities = [...securities]
    tempSecurities[index] = {
      ...tempSecurities[index],
      netPremiumAt100: value,
      isChangeBrokerAgeAmount: false,
      isChangeFrontingFeeAmount: false,
      isChangeTaxesAmount: false,
      isChangeDynamicCommissionAmount: false,
      discounts: tempSecurities[index].discounts.map(discount => ({ ...discount, isChangeAmount: false }))
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)
  }

  useEffect(() => {
    // activacion de modal para visualizar la segunda vista
    if (!isOpenModal) {
      if (!$inputRef) return

      if (activeView !== 0) {
        setTimeout(() => {
          $inputRef[index]?.focus()

          $inputRef[index]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }, 300)
      } else {
        $inputRef[index]?.blur()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal])

  useEffect(() => {
    if (!isOpenModalUndo) {
      if (!$inputRef) return

      if (activeView === 0) {
        setTimeout(() => {
          $inputRef[index]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
        }, 300)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModalUndo])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <NumericFormat
        fullWidth
        autoFocus
        label={isGross ? `Gross premium at %100 ` : 'Net premium at %100'}
        value={value}
        onValueChange={(values, sourceInfo) => {
          if (sourceInfo.event) handleChangeBaseAmount(Number(values.floatValue))
        }}
        onClick={handleClick}
        prefix={'$'}
        customInput={TextField}
        thousandSeparator=','
        disabled={view === 2}
      />

      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
    </FormControl>
  )
}

export const grossOrNetPremiumAt100_validations = () =>
  yup.object().shape({
    netPremiumAt100: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val > 0
      })
      .required('This field is required')
  })
