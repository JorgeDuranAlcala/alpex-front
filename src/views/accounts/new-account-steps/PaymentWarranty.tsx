import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

// import Icon from 'src/@core/components/icon'

import UserThemeOptions from 'src/layouts/UserThemeOptions'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  InstallmentContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

// interface InstallmentsNumber {
//   installments: number | string
// }

// const initialData: InstallmentsNumber = {
//   installments: ''
// }

const PaymentWarranty = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  // const [formData, setFormData] = useState<InstallmentsNumber>(initialData)

  // const [inceptionDate, setInceptionDate] = useState<DateType>(new Date())

  const [count, setCount] = useState<number>(0)

  // const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  //   return (
  //     <TextField fullWidth inputRef={ref} sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }} {...props} />
  //   )
  // })

  // const handleFormChange = (field: keyof InstallmentsNumber, value: InstallmentsNumber[keyof InstallmentsNumber]) => {
  //   setFormData({ ...formData, [field]: value })
  // }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setCount(parseInt(event.target.value))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      setCount(count + 1)
    }
  }

  return (
    <>
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>
          <InputsContainer>
            <TextField
              label='Inception date'
              sx={{ width: '32%' }}
              value={'25/04/2023'}
              InputProps={{
                disabled: true
              }}
            />
            <TextField
              label='Dynamic net premium'
              sx={{ width: '32%' }}
              value={'1000'}
              InputProps={{
                disabled: true
              }}
            />
            <TextField
              label='Installments'
              sx={{ width: '32%' }}
              value={count}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </InputsContainer>
        </TitleContainer>
        {/* <Button
          size='small'
          variant='contained'
          startIcon={<Icon icon='mdi:plus' fontSize={20} />}
          onClick={() => setCount(count + 1)}
        >
          Add Item
        </Button> */}
        <InstallmentContainer>
          <CardInstallment count={count} />
        </InstallmentContainer>
      </GeneralContainer>
      <NextContainer>
        <Button
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
          disabled
        >
          <SaveIcon /> &nbsp; Save changes
        </Button>
        <Button
          sx={{
            fontFamily: inter,
            letterSpacing: '0.4px',
            fontSize: userThemeConfig.typography?.size.px15,
            color: texButtonColor
          }}
        >
          Nex step &nbsp;
          <ArrowForwardIcon />
        </Button>
      </NextContainer>
    </>
  )
}

export default PaymentWarranty

// import React, {
//   useState,
//   ChangeEvent,
// } from 'react';

// export default function DemoInput() {
//   const [message, setMessage] = useState('');

//   const [updated, setUpdated] = useState('');

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setMessage(event.target.value);
//   };

//   // const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
//   //   // Do something
//   //   console.log(e.key);
//   //   if (e.key === 'Enter') {

//   //   }
//   // };
//   const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
//     console.log(event.key);
//     if (event.key === 'Enter') {
//       setUpdated(message);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         id="message"
//         name="message"
//         value={message}
//         onChange={handleChange}
//         defaultValue=""
//         onKeyDown={handleKeyDown}
//       />

//       <h2>Message: {message}</h2>

//       <h2>Updated: {updated}</h2>
//     </div>
//   );
// }
