import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField, Typography } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  InstallmentContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

const PaymentWarranty = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  return (
    <>
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>
          <InputsContainer>
            <TextField label='Inception date' sx={{ width: '32%' }} />
            <TextField label='Dynamic net premium' sx={{ width: '32%' }} />
            <TextField label='Installments' sx={{ width: '32%' }} />
          </InputsContainer>
        </TitleContainer>
        <InstallmentContainer>
          <CardInstallment />
          {/* <CardInstallment />
          <CardInstallment /> */}
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
