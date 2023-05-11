import { FormControl, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material'

// import { useState } from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { ForwardedRef, forwardRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { NumericFormat } from 'react-number-format'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { ContainerCard, ContainerCardInputs } from '../../../styles/Forms/PaymentWarranty/paymentWarranty'

//dtos
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'

interface GlobalInfo {
  dynamic: number
  inceptionDate: Date
}
interface ICardInstallment {
  index: number
  installment: InstallmentDto
  onChangeList: (index: number, item: InstallmentDto) => void
  globalInfo: GlobalInfo
}

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
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

const CardInstallment = ({ index, installment, onChangeList, globalInfo }: ICardInstallment) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle

  // const [error,setError]=useState<InstallmentsErrors>({percentagePaymentError:false})
  const [formData, setFormData] = useState<InstallmentDto>({
    paymentPercentage: installment.paymentPercentage,
    balanceDue: installment.balanceDue,
    premiumPaymentWarranty: installment.premiumPaymentWarranty,
    settlementDueDate: installment.settlementDueDate,
    idAccount: 1,
    id: 0
  })

  const { dynamic, inceptionDate } = globalInfo

  const handleNumericInputChange = (value: any, e: any) => {
    const { name } = e.event.target

    const formDataTemp = { ...formData }

    if (name === 'premiumPaymentWarranty') {
      formDataTemp.premiumPaymentWarranty = value
      const days = formDataTemp.premiumPaymentWarranty * 24 * 60 * 60 * 1000
      formDataTemp.settlementDueDate = new Date(inceptionDate.getTime() + days)
    }

    if (name === 'paymentPercentage') {
      formDataTemp.paymentPercentage = value
      formDataTemp.balanceDue = dynamic * (formDataTemp.paymentPercentage / 100)
    }

    setFormData({ ...formDataTemp, [name]: value })
    onChangeList(index, {
      ...formDataTemp,
      [name]: value
    })
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
                value={formData.premiumPaymentWarranty}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='filled-multiline-flexible'
                label='PremiumPaymentWarranty'
                multiline
                min={1}
                max={999}
                maxLength={4}
                minLength={1}
                decimalScale={0}
                variant='outlined'
                onValueChange={(value, e) => handleNumericInputChange(value.value, e)}
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
                value={formData.paymentPercentage}
                onValueChange={(value, e) => handleNumericInputChange(value.floatValue, e)}
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
                customInput={<CustomInput label='Reception date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
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

// <RepeaterWrapper>
//         <Repeater count={count}>
//           {(i: number) => {
//             const Tag = i === 0 ? Box : Collapse

//             return (
//               <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
//                 <Grid container>
//                   <RepeatingContent item xs={12}>
//                     <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
//                       <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
//                         <Typography
//                           variant='subtitle2'
//                           className='col-title'
//                           sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
//                         >
//                           Item
//                         </Typography>
//                         <Select fullWidth size='small' defaultValue='App Design'>
//                           <MenuItem value='App Design'>App Design</MenuItem>
//                           <MenuItem value='App Customization'>App Customization</MenuItem>
//                           <MenuItem value='ABC Template'>ABC Template</MenuItem>
//                           <MenuItem value='App Development'>App Development</MenuItem>
//                         </Select>
//                         <TextField
//                           rows={2}
//                           fullWidth
//                           multiline
//                           size='small'
//                           sx={{ mt: 3.5 }}
//                           defaultValue='Customization & Bug Fixes'
//                         />
//                       </Grid>
//                       <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
//                         <Typography
//                           variant='subtitle2'
//                           className='col-title'
//                           sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
//                         >
//                           Cost
//                         </Typography>
//                         <TextField
//                           size='small'
//                           type='number'
//                           placeholder='24'
//                           defaultValue='24'
//                           InputProps={{ inputProps: { min: 0 } }}
//                         />
//                         <Box sx={{ mt: 3.5 }}>
//                           <Typography component='span' variant='body2' sx={{ lineHeight: 2 }}>
//                             Discount:
//                           </Typography>{' '}
//                           <Typography component='span' variant='body2'>
//                             0%
//                           </Typography>
//                           <Tooltip title='Tax 1' placement='top'>
//                             <Typography component='span' variant='body2' sx={{ mx: 2 }}>
//                               0%
//                             </Typography>
//                           </Tooltip>
//                           <Tooltip title='Tax 2' placement='top'>
//                             <Typography component='span' variant='body2'>
//                               0%
//                             </Typography>
//                           </Tooltip>
//                         </Box>
//                       </Grid>
//                       <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
//                         <Typography
//                           variant='subtitle2'
//                           className='col-title'
//                           sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
//                         >
//                           Hours
//                         </Typography>
//                         <TextField
//                           size='small'
//                           type='number'
//                           placeholder='1'
//                           defaultValue='1'
//                           InputProps={{ inputProps: { min: 0 } }}
//                         />
//                       </Grid>
//                       <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
//                         <Typography
//                           variant='subtitle2'
//                           className='col-title'
//                           sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
//                         >
//                           Price
//                         </Typography>
//                         <Typography variant='body2'>$24.00</Typography>
//                       </Grid>
//                     </Grid>
//                     <InvoiceAction>
//                       <IconButton size='small' onClick={deleteForm}>
//                         <Icon icon='mdi:close' fontSize={20} />
//                       </IconButton>
//                     </InvoiceAction>
//                   </RepeatingContent>
//                 </Grid>
//               </Tag>
//             )
//           }}
//         </Repeater>

//         <Grid container sx={{ mt: 4.75 }}>
//           <Grid item xs={12} sx={{ px: 0 }}>
//             <Button
//               size='small'
//               variant='contained'
//               startIcon={<Icon icon='mdi:plus' fontSize={20} />}
//               onClick={() => setCount(count + 1)}
//             >
//               Add Item
//             </Button>
//           </Grid>
//         </Grid>
//       </RepeaterWrapper>
