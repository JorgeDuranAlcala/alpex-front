import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SaveIcon from '@mui/icons-material/Save'
import { Button, FormHelperText, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material'
import { ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

// import Icon from 'src/@core/components/icon'

import UserThemeOptions from 'src/layouts/UserThemeOptions'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

//hooks
import { useAddInstallments } from 'src/hooks/accounts/installments'
import { useAppSelector } from 'src/store'

//dtos
import { useGetAccountById } from '@/hooks/accounts/forms'
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'

interface InstallmentErrors {
  errorFieldRequired: boolean
  erorrRangeInstallments: boolean
  errorOnlyNumbers: boolean
}

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}

type InformationProps = {
  onStepChange?: (step: number) => void
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

const PaymentWarranty: React.FC<InformationProps> = ({ onStepChange }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary
  const [installmentsList, setInstallmentList] = useState<InstallmentDto[]>([])

  const [count, setCount] = useState<string>('0')
  const [, setBtnNext] = useState<boolean>(false)
  const [error, setError] = useState<InstallmentErrors>({
    errorFieldRequired: false,
    erorrRangeInstallments: false,
    errorOnlyNumbers: false
  })

  const { addInstallments } = useAddInstallments()
  const accountData = useAppSelector(state => state.accounts)
  const idAccount = accountData.formsData.form1.id
  const { account, setAccountId } = useGetAccountById()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(event.target.value)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setError({
        ...error,
        errorFieldRequired: true
      })
    } else {
      setError({
        ...error,
        errorFieldRequired: false
      })
    }
  }

  const handleItemChange = (index: number, item: InstallmentDto) => {
    setInstallmentList([...installmentsList.slice(0, index), item, ...installmentsList.slice(index + 1)])
  }

  const saveInstallments = (installments: Omit<InstallmentDto[], 'id'>) => {
    addInstallments(installments)
  }

  const nestStep = () => {
    if (onStepChange) {
      saveInstallments(installmentsList)
      onStepChange(4)
    }
  }

  useEffect(() => {
    if (parseInt(count) === 0 || parseInt(count) > 12) {
      setError({
        ...error,
        erorrRangeInstallments: true
      })
    } else {
      setError({
        ...error,
        erorrRangeInstallments: false
      })
      setBtnNext(true)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
  useEffect(() => {
    idAccount && setAccountId(idAccount)
  }, [idAccount, setAccountId])

  return (
    <>
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>
          <InputsContainer>
            <Grid container spacing={{ xs: 2, sm: 5, md: 5 }} rowSpacing={4} columns={12}>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  selected={account ? new Date(account?.informations[0].effetiveDate) : null}
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
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label='Dynamic net premium'
                  value={account ? account.securityTotal.receivedNetPremium : null}
                  InputProps={{
                    disabled: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={error.erorrRangeInstallments || error.errorFieldRequired || error.errorOnlyNumbers}
                  fullWidth
                  label='Installments'
                  value={count}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {error.errorFieldRequired && (
                  <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                )}
                {error.erorrRangeInstallments && (
                  <FormHelperText sx={{ color: 'error.main' }}>Can not enter 0</FormHelperText>
                )}
                {error.errorOnlyNumbers && <FormHelperText sx={{ color: 'error.main' }}>Only numbers</FormHelperText>}
              </Grid>
            </Grid>
          </InputsContainer>
        </TitleContainer>

        <Grid container spacing={2}>
          {Array.from({ length: Number(count) }, (_, index) => (
            <CardInstallment
              index={index}
              installment={
                installmentsList[index] || {
                  balanceDue: 0,
                  percentagePayment: 0,
                  premiumPayment: 0,
                  settlementDueDate: undefined
                }
              }
              onChangeList={handleItemChange}
              globalInfo={{
                receivedNetPremium: account ? account.securityTotal.receivesNetPremium : '',
                inceptionDate: account ? account.informations[0].effectiveDate : '',
                idAccount: account ? idAccount : ''
              }}
              key={index}
            />
          ))}
        </Grid>
      </GeneralContainer>
      <NextContainer>
        <Button
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
          onClick={() => saveInstallments(installmentsList)}
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
          onClick={() => nestStep()}
        >
          Nex step &nbsp;
          <ArrowForwardIcon />
        </Button>
      </NextContainer>
    </>
  )
}

export default PaymentWarranty
