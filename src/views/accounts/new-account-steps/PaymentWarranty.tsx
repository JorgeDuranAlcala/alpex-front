import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SaveIcon from '@mui/icons-material/Save'
import { Button, FormHelperText, Grid, InputAdornment, SxProps, TextField, Theme, Typography } from '@mui/material'
import { FocusEvent, ForwardedRef, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

// import Icon from 'src/@core/components/icon'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal } from '@mui/material'

import UserThemeOptions from 'src/layouts/UserThemeOptions'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

//hooks
import { useAddInstallments, useUpdateInstallments } from 'src/hooks/accounts/installments'
import { useAppSelector } from 'src/store'
import * as yup from 'yup'

//dtos
import { useGetAccountById } from '@/hooks/accounts/forms'
import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'
import { NumericFormat } from 'react-number-format'
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

const schema = yup.object().shape({
  paymentPercentage: yup.number().required(),
  balanceDue: yup.number().required(),
  premiumPaymentWarranty: yup.number().required(),
  settlementDueDate: yup.date().required()
})

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
  const [btnNext, setBtnNext] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<InstallmentErrors>({
    errorFieldRequired: false,
    erorrRangeInstallments: false,
    errorOnlyNumbers: false
  })

  const { addInstallments } = useAddInstallments()
  const { updateInstallments } = useUpdateInstallments()
  const accountData = useAppSelector(state => state.accounts)
  const idAccount = accountData.formsData.form1.id
  const { account, setAccountId } = useGetAccountById()

  // State to save installments Ids to upload
  const [instIds, setInstIds] = useState<number[]>([])

  const handleNumericInputChange = (value: any) => {
    setCount(String(value))
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

  useEffect(() => {
    //yup validate each form of installmentlist
    for (let i = 0; i < +count; i++) {
      const item = installmentsList[i]
      schema
        .validate(item)
        .then(() => {
          const sum = installmentsList.reduce((acc, item) => acc + item.paymentPercentage, 0)
          if (sum === 100) {
            setBtnNext(true)
          } else {
            setBtnNext(false)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [installmentsList, count])

  const saveInstallments = async (installments: InstallmentDto[]) => {
    const installmentsToUpdate: InstallmentDto[] = []
    const newIds: number[] = instIds

    if (newIds.length > 0) {
      if (newIds.length >= installments.length) {
        // Update all
        for (const [idx, installment] of installments.entries()) {
          installment.id = newIds[idx]
          installmentsToUpdate.push(installment)
        }
        await updateInstallments(installmentsToUpdate)
      } else {
        // Update some and create some
        const installmentsToCreate: InstallmentDto[] = []
        for (const [idx, installment] of installments.entries()) {
          if (newIds[idx]) {
            installment.id = newIds[idx]
            installmentsToUpdate.push(installment)
          } else {
            installmentsToCreate.push(installment)
          }
        }
        await updateInstallments(installmentsToUpdate)

        const resCreate = await addInstallments(installmentsToCreate)
        if (resCreate && resCreate.length > 0) {
          for (const createdInstallment of resCreate) {
            newIds.push(createdInstallment.id)
          }
        }
        setInstIds(newIds)
      }
    } else {
      // Create all
      const resCreate = await addInstallments(installments)
      if (resCreate && resCreate.length > 0) {
        for (const createdInstallment of resCreate) {
          newIds.push(createdInstallment.id)
        }
      }
      setInstIds(newIds)
    }
  }

  const nextStep = () => {
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
                  selected={account ? new Date(account?.informations[0]?.effectiveDate + 'T00:00:00') : null}
                  shouldCloseOnSelect
                  id='reception-date'
                  showTimeSelect
                  timeIntervals={15}
                  customInput={<CustomInput label='Reception date' sx={{ mb: 2, mt: 0, width: '100%' }} />}
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
                  value={account ? account?.securityTotal?.receivedNetPremium : ' '}
                  InputProps={{
                    disabled: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NumericFormat
                  name='Installments'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={TextField}
                  id='Installments'
                  defaultValue={1}
                  label='Installments'
                  multiline
                  decimalScale={0}
                  variant='outlined'
                  isAllowed={values => {
                    const { floatValue } = values
                    const upLimit = 12

                    return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                  }}
                  value={count}
                  onValueChange={value => {
                    handleNumericInputChange(value.value)
                  }}
                  onBlur={handleBlur}
                />
                {error.errorFieldRequired && (
                  <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                )}
                {error.erorrRangeInstallments && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
                {error.errorOnlyNumbers && <FormHelperText sx={{ color: 'error.main' }}>Only numbers</FormHelperText>}
              </Grid>
            </Grid>
          </InputsContainer>
        </TitleContainer>

        <Grid container spacing={2}>
          {Array.from({ length: Number(count) || 0 }, (_, index) => (
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
                receivedNetPremium: account ? account?.securityTotal?.receivedNetPremium : 0,
                inceptionDate: account ? new Date(account?.informations[0]?.effectiveDate + 'T00:00:00') : null,
                idAccount: account ? idAccount : ''
              }}
              count={+count}
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
          onClick={() => setOpen(true)}
        >
          Next step &nbsp;
          <ArrowForwardIcon />
        </Button>

        <Modal
          className='next-step-modal'
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bgcolor: 'white',
              top: '50%',
              left: '50%',
              boxShadow: 24,
              pl: 5,
              pr: 5,
              transform: 'translate(-50%, -50%)',
              borderRadius: '10px',
              padding: '15px'
            }}
          >
            <HeaderTitleModal>
              <div className='next-modal-title'>Ready to continue?</div>
              <ButtonClose
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon />
              </ButtonClose>
            </HeaderTitleModal>
            <div className='next-modal-text'>
              You are about to advance to the next form. Make sure that all the fields have been completed with the
              correct information.
            </div>
            <Button
              className='continue-modal-btn'
              variant='contained'
              disabled={!btnNext}
              onClick={() => {
                nextStep()
              }}
            >
              CONTINUE
            </Button>
            <Button className='create-contact-modal' onClick={() => setOpen(false)}>
              Keep editing information
            </Button>
          </Box>
        </Modal>
      </NextContainer>
    </>
  )
}

export default PaymentWarranty
