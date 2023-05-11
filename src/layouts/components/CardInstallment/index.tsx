import { FormControl, Grid, TextField, Typography } from '@mui/material'

// import { useState } from 'react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import RepeaterHorizontal from 'src/pages/components/repeaterHorizontal'
import { ContainerCard, ContainerCardInputs } from '../../../styles/Forms/PaymentWarranty/paymentWarranty'

interface ICardInstallment {
  count: number
}

// interface InstallmentsErrors {
//   percentagePaymentError: boolean
// }

interface InstallmentsProps {
  premiumPayment: string
  percentagePayment: number
  balanceDue?: string
  settlementDueDate?: Date | null
}

const installmentFrom: InstallmentsProps = {
  premiumPayment: '',
  percentagePayment: 0
}

// type InstallmentsProps = {
//   installmentInfo: {
//     premiumPayment: string
//     percentagePayment: number
//     balanceDue: string
//     settlementDueDate: Date | null

//   };
//   setBasicInfo: React.Dispatch<
//     React.SetStateAction<{
//       premiumPayment: string
//       percentagePayment: number
//       balanceDue: string
//       settlementDueDate: Date | null

//     }>
//   >;
//   makeValidations: boolean;
//   resetMakeValidations: () => void;
//   isValidForm?: (valid: boolean) => void;
// };

const CardInstallment = ({ count }: ICardInstallment) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const textColor = userThemeConfig.palette?.text.subTitle

  // const [error,setError]=useState<InstallmentsErrors>({percentagePaymentError:false})
  const [formData, setFormData] = useState<InstallmentsProps>(installmentFrom)

  const handleChange = (field: keyof InstallmentsProps, value: InstallmentsProps[keyof InstallmentsProps]) => {
    // setStartValidations(true)
    setFormData({ ...formData, [field]: value })
  }

  return (
    <>
      <RepeaterHorizontal count={count}>
        {(i: number) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <ContainerCard key={i}>
                <Typography variant='h6' sx={{ color: textColor }}>
                  Installment {i + 1}
                </Typography>
                <ContainerCardInputs>
                  <FormControl fullWidth>
                    <TextField
                      label='Premium payment warranty'
                      onChange={e => handleChange('premiumPayment', e.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <NumericFormat
                      name='reinsuranceBrokerageP'
                      allowLeadingZeros
                      thousandSeparator=','
                      customInput={TextField}
                      id='reinsurance-brokerage'
                      label='Payment %'
                      multiline
                      prefix={'%'}
                      decimalScale={2}
                      variant='outlined'
                    />
                    {/* {error. && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>} */}
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label='Balance due'
                      value={'25/04/2023'}
                      InputProps={{
                        disabled: true
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label='Settlement due dat'
                      value={'25/04/2023'}
                      InputProps={{
                        disabled: true
                      }}
                    />
                  </FormControl>
                </ContainerCardInputs>
              </ContainerCard>
            </Grid>
          )
        }}
      </RepeaterHorizontal>
    </>
  )
}

export default CardInstallment
