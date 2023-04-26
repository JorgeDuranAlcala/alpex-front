import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import Icon from 'src/@core/components/icon'

import UserThemeOptions from 'src/layouts/UserThemeOptions'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  InstallmentContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

interface InstallmentsNumber {
  installments: number | string
}

const initialData: InstallmentsNumber = {
  installments: ''
}
const PaymentWarranty = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary
  const [formData, setFormData] = useState<InstallmentsNumber>(initialData)

  // const [inceptionDate, setInceptionDate] = useState<DateType>(new Date())

  const [count, setCount] = useState<number>(0)

  // const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  //   return (
  //     <TextField fullWidth inputRef={ref} sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }} {...props} />
  //   )
  // })

  const handleFormChange = (field: keyof InstallmentsNumber, value: InstallmentsNumber[keyof InstallmentsNumber]) => {
    setFormData({ ...formData, [field]: value })
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
              value={formData.installments}
              onChange={e => handleFormChange('installments', e.target.value)}
            />
          </InputsContainer>
        </TitleContainer>
        <Button
          size='small'
          variant='contained'
          startIcon={<Icon icon='mdi:plus' fontSize={20} />}
          onClick={() => setCount(count + 1)}
        >
          Add Item
        </Button>
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
