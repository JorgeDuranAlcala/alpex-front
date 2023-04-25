import { FormControl, TextField, Typography } from '@mui/material'

// import Box from '@mui/material/Box'

// import Collapse from '@mui/material/Collapse'

// import { NumericFormat } from 'react-number-format'

import { useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import RepeaterHorizontal from 'src/pages/components/repeaterHorizontal'
import { ContainerCard, ContainerCardInputs } from '../../../styles/Forms/PaymentWarranty/paymentWarranty'

interface ICardInstallment {
  count: number
}

interface InstallmentCardData {
  premiumPayment: string
  payment: string
  balanceDue: number
  settlementDueDate: string
}

const initialData: InstallmentCardData = {
  premiumPayment: '',
  payment: '',
  balanceDue: 0,
  settlementDueDate: ''
}
const CardInstallment = ({ count }: ICardInstallment) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle
  const [formData, setFormData] = useState<InstallmentCardData>(initialData)

  const handleFormChange = (
    field: keyof InstallmentCardData,
    value: InstallmentCardData[keyof InstallmentCardData]
  ) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <>
      <RepeaterHorizontal count={count}>
        {(i: number) => {
          return (
            <ContainerCard key={i} {...(i !== 0 ? { in: true } : {})}>
              <Typography variant='h6' sx={{ color: textColor }}>
                Installment {i + 1}
              </Typography>
              <ContainerCardInputs>
                <FormControl fullWidth>
                  {/* <NumericFormat customInput={TextField} variant='outlined' prefix={'$'} /> */}
                  <TextField
                    label='Premium payment warranty'
                    value={formData.premiumPayment}
                    onChange={e => handleFormChange('premiumPayment', e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField label='Payment %' />
                </FormControl>
                <FormControl fullWidth>
                  <TextField label='Balance due' />
                </FormControl>
                <FormControl fullWidth>
                  <TextField label='Settlement due dat' />
                </FormControl>
              </ContainerCardInputs>
            </ContainerCard>
          )
        }}
      </RepeaterHorizontal>
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
