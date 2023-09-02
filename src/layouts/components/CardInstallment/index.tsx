import { FormControl, FormHelperText, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material'

// import { useState } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { ForwardedRef, forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import { NumericFormat } from 'react-number-format'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { ContainerCard, ContainerCardInputs } from '../../../styles/Forms/PaymentWarranty/paymentWarranty'

//dtos
import { isValidDate } from '@/utils/formatDates'
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'

interface GlobalInfo {
  receivedNetPremium: number
  inceptionDate: Date | null
  idAccount: number
}

interface ICardInstallment {
  index: number
  installment: InstallmentDto
  globalInfo: GlobalInfo
  count?: number
  daysFirst?: number
  error100Percent: boolean
  onChangeList: (index: number, { name, value }: { name: keyof InstallmentDto; value: any }) => void
  setIsUpdatedInfoByUser?: React.Dispatch<React.SetStateAction<boolean>>
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

const CardInstallment = ({ index, installment, onChangeList, error100Percent, setIsUpdatedInfoByUser }: ICardInstallment) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle

  const handleNumericInputChange = (value: any, name: keyof InstallmentDto) => {
    onChangeList(index, { name, value })
  }

  const handleUpdatedInfoByUser = () => {
    if (setIsUpdatedInfoByUser) {

      setIsUpdatedInfoByUser(true);
    }
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
                defaultValue={0}
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
                onValueChange={(value, sourceInfo) => {
                  handleNumericInputChange(value.value, 'premiumPaymentWarranty')
                  if (sourceInfo.event) { handleUpdatedInfoByUser() }
                }
                }
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
                suffix='%'
                variant='outlined'
                isAllowed={values => {
                  const { floatValue } = values
                  const upLimit = 100

                  return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                }}
                value={
                  typeof installment.paymentPercentage === 'number'
                    ? installment.paymentPercentage.toFixed(2)
                    : installment.paymentPercentage
                }
                onValueChange={(value, sourceInfo) => {
                  handleNumericInputChange(value.floatValue, 'paymentPercentage')
                  if (sourceInfo.event) { handleUpdatedInfoByUser() }
                }
                }
              />
              {error100Percent && (
                <FormHelperText sx={{ color: 'error.main' }}>The sum of payment % must be equal to 100.</FormHelperText>
              )}
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
                variant='outlined'
                value={
                  typeof installment.balanceDue === 'number'
                    ? installment.balanceDue.toFixed(2)
                    : installment.balanceDue
                }
                disabled={true}
              />
            </FormControl>
            <FormControl fullWidth>
              <ReactDatePicker
                selected={isValidDate(String(installment.settlementDueDate)) ? installment.settlementDueDate : null}
                shouldCloseOnSelect
                id='reception-date'
                showTimeSelect
                timeIntervals={15}
                customInput={<CustomInput label='Settlement due date' sx={{ width: '100%' }} />}
                disabled={true}
                onChange={() => {

                  return
                }}
                dateFormat={'dd/MM/yyyy'}
              />
            </FormControl>
          </ContainerCardInputs>
        </ContainerCard>
      </Grid>
    </>
  )
}

export default CardInstallment
