import { FormControl, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material'

// import { useState } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { NumericFormat } from 'react-number-format'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { ContainerCard, ContainerCardInputs } from '../../../styles/Forms/PaymentWarranty/paymentWarranty'

//dtos
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'

interface GlobalInfo {
  receivedNetPremium: number
  inceptionDate: Date | null
  idAccount: number
}
interface ICardInstallment {
  index: number
  installment: InstallmentDto
  onChangeList: (index: number, item: InstallmentDto) => void
  globalInfo: GlobalInfo
  count?: number
  daysFirst?: number
}

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
  count?: number
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      id='date-textfield'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <CalendarTodayIcon />
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})

const CardInstallment = ({ index, installment, onChangeList, globalInfo, count, daysFirst }: ICardInstallment) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle

  // const [error,setError]=useState<InstallmentsErrors>({percentagePaymentError:false})
  const [formData, setFormData] = useState<InstallmentDto>({
    paymentPercentage: installment.paymentPercentage,
    balanceDue: installment.balanceDue,
    premiumPaymentWarranty: installment.premiumPaymentWarranty,
    settlementDueDate: installment.settlementDueDate,
    idAccount: globalInfo.idAccount,
    id: installment.id || 0
  })

  const { receivedNetPremium, inceptionDate } = globalInfo

  useEffect(() => {
    setTimeout(() => {
      setFormData(state => {
        const balanceDue = receivedNetPremium * (installment.paymentPercentage / 100)
        const paymentWarranty =
          installment.premiumPaymentWarranty !== 0 ? installment.premiumPaymentWarranty : index + 1

        if (inceptionDate && paymentWarranty) {
          const days = paymentWarranty * 24 * 60 * 60 * 1000
          state.settlementDueDate = new Date(inceptionDate.getTime() + days)
        } else {
          state.settlementDueDate = installment.settlementDueDate
        }

        state.idAccount = globalInfo.idAccount
        state.premiumPaymentWarranty = paymentWarranty
        state.paymentPercentage = installment.paymentPercentage
        state.id = installment.id
        state.balanceDue = balanceDue

        return state
      })
    }, 25)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installment, index])

  useEffect(() => {
    setTimeout(() => {
      setFormData(state => {
        const premiumPaymentWarranty = daysFirst ? daysFirst * (index + 1) : formData.premiumPaymentWarranty

        if (inceptionDate && premiumPaymentWarranty) {
          const days = premiumPaymentWarranty * 24 * 60 * 60 * 1000
          const settlementDueDate = new Date(inceptionDate.getTime() + days)

          return {
            ...state,
            premiumPaymentWarranty,
            settlementDueDate: settlementDueDate
          }
        }

        return {
          ...state,
          premiumPaymentWarranty
        }
      })
    }, 12)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysFirst])

  const handleNumericInputChange = (value: any, name: any) => {
    const formDataTemp = { ...formData }

    if (name === 'premiumPaymentWarranty' && inceptionDate) {
      formDataTemp.premiumPaymentWarranty = value
      const days = formDataTemp.premiumPaymentWarranty * 24 * 60 * 60 * 1000
      formDataTemp.settlementDueDate = new Date(inceptionDate.getTime() + days)
    }

    if (name === 'paymentPercentage' && receivedNetPremium) {
      formDataTemp.paymentPercentage = value
      formDataTemp.balanceDue = receivedNetPremium * (formDataTemp.paymentPercentage / 100)
    }

    setFormData({ ...formDataTemp, [name]: value })
    onChangeList(index, {
      ...formDataTemp,
      [name]: value
    })
  }

  useEffect(() => {
    try {
      if (count === 1) {
        const formDataTemp = { ...formData }
        formDataTemp.paymentPercentage = 100
        formDataTemp.balanceDue = receivedNetPremium
        setFormData({ ...formDataTemp })
      } else {
        const formDataTemp = { ...formData }
        formDataTemp.paymentPercentage = Number(undefined)
        formDataTemp.balanceDue = receivedNetPremium
        setFormData({ ...formDataTemp })
      }
    } catch {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <ContainerCard>
          <Typography variant='h6' sx={{ color: textColor }}>
            Installment {index + 1}
          </Typography>
          <ContainerCardInputs>
            <FormControl fullWidth>
              <NumericFormat
                name='premiumPaymentWarranty'
                value={formData.premiumPaymentWarranty}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='filled-multiline-flexible'
                label='Premium payment warranty'
                multiline
                min={1}
                max={999}
                maxLength={4}
                minLength={1}
                decimalScale={0}
                variant='outlined'
                isAllowed={values => {
                  const { floatValue } = values
                  const upLimit = 999

                  return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                }}
                onValueChange={value => handleNumericInputChange(value.value, 'premiumPaymentWarranty')}
              />
            </FormControl>
            <FormControl fullWidth>
              <NumericFormat
                name='paymentPercentage'
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='percentagePayment'
                label='Payment %'
                multiline
                prefix={'%'}
                decimalScale={2}
                variant='outlined'
                isAllowed={values => {
                  const { floatValue } = values
                  const upLimit = 100

                  return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                }}
                value={formData.paymentPercentage}
                onValueChange={value => handleNumericInputChange(value.floatValue, 'paymentPercentage')}
              />
              {/* {error. && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>} */}
            </FormControl>
            <FormControl fullWidth>
              <NumericFormat
                name='balanceDue'
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='balanceDue'
                label='Balance Due'
                multiline
                prefix={'$'}
                decimalScale={2}
                variant='outlined'
                value={formData.balanceDue}
                disabled={true}
              />
            </FormControl>
            <FormControl fullWidth>
              <ReactDatePicker
                selected={formData.settlementDueDate}
                shouldCloseOnSelect
                id='reception-date'
                showTimeSelect
                timeIntervals={15}
                customInput={<CustomInput label='Settlement due date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
                disabled={true}
                onChange={() => {
                  return
                }}
              />
            </FormControl>
          </ContainerCardInputs>
        </ContainerCard>
      </Grid>
    </>
  )
}

export default CardInstallment
