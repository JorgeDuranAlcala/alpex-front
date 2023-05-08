import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SaveIcon from '@mui/icons-material/Save'
import { Button, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'

// import Icon from 'src/@core/components/icon'

import UserThemeOptions from 'src/layouts/UserThemeOptions'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

interface InstallmentErrors {
  errorFieldRequired: boolean
  erorrRangeInstallments: boolean
  errorOnlyNumbers: boolean
}
const PaymentWarranty = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  const [count, setCount] = useState<string>('')
  const [btnNext, setBtnNext] = useState<boolean>(false)
  const [error, setError] = useState<InstallmentErrors>({
    errorFieldRequired: false,
    erorrRangeInstallments: false,
    errorOnlyNumbers: false
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
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

  // const regExpNumbers = /^[1-9]+$/

  // const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
  //   console.log(event.key)
  //   if (event.key === 'Enter') {
  //     setCount(count + 1)
  //   }
  // }

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
  }, [count, error])

  return (
    <>
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>
          <InputsContainer>
            <Grid container spacing={{ xs: 2, sm: 5, md: 5 }} rowSpacing={4} columns={12}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label='Inception date'
                  value={'25/04/2023'}
                  InputProps={{
                    disabled: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label='Dynamic net premium'
                  value={'1000'}
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

                  // onKeyDown={handleKeyDown}
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
        <CardInstallment count={parseInt(count)} />
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
          disabled={btnNext}
        >
          Nex step &nbsp;
          <ArrowForwardIcon />
        </Button>
      </NextContainer>
    </>
  )
}

export default PaymentWarranty
