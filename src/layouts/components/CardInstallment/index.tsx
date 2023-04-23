import { FormControl, TextField, Typography } from '@mui/material'

// import { NumericFormat } from 'react-number-format'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { ContainerCard, ContainerCardInputs } from '../../../styles/Forms/PaymentWarranty/paymentWarranty'

const CardInstallment = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle

  return (
    <ContainerCard>
      <Typography variant='h6' sx={{ color: textColor }}>
        Installment 1
      </Typography>
      <ContainerCardInputs>
        <FormControl fullWidth>
          {/* <NumericFormat customInput={TextField} variant='outlined' prefix={'$'} /> */}
          <TextField label='Premium payment warranty' />
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
}

export default CardInstallment
