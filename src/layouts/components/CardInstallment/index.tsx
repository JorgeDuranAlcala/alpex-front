import { FormControl, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material'

// import { useState } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { ForwardedRef, forwardRef } from 'react'
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
  onChangeList: (index: number, { name, value }: { name: keyof InstallmentDto; value: any }) => void
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

const CardInstallment = ({ index, installment, onChangeList }: ICardInstallment) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle

  const handleNumericInputChange = (value: any, name: keyof InstallmentDto) => {
    onChangeList(index, { name, value })
  }

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
                value={installment.premiumPaymentWarranty}
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
                value={installment.paymentPercentage}
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
                value={installment.balanceDue}
                disabled={true}
              />
            </FormControl>
            <FormControl fullWidth>
              <ReactDatePicker
                selected={installment.settlementDueDate}
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
