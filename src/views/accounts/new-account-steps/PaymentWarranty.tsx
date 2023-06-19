import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SaveIcon from '@mui/icons-material/Save'
import {
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
  Typography
} from '@mui/material'
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
import { useAddInstallments, useDeleteInstallments } from 'src/hooks/accounts/installments'
import { useAppSelector } from 'src/store'
import * as yup from 'yup'

//dtos
import { useGetAccountById } from '@/hooks/accounts/forms'
import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'
import { delayMs } from '@/utils/formatDates'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { Icon } from '@iconify/react'
import { NumericFormat } from 'react-number-format'
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'

interface InstallmentErrors {
  errorFieldRequired: boolean
  erorrRangeInstallments: boolean
  errorOnlyNumbers: boolean
  error100Percent: boolean
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
  const [initialInstallmentList, setInitialInstallmentList] = useState<InstallmentDto[]>([])

  const [count, setCount] = useState<number>()
  const [btnNext, setBtnNext] = useState<boolean>(false)
  const [daysFirst, setDaysFirst] = useState<number>()
  const [open, setOpen] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false)
  const [error, setError] = useState<InstallmentErrors>({
    errorFieldRequired: false,
    erorrRangeInstallments: false,
    errorOnlyNumbers: false,
    error100Percent: false
  })

  const { addInstallments } = useAddInstallments()
  const accountData = useAppSelector(state => state.accounts)
  const idAccount = accountData?.formsData?.form1?.id
  const { account, setAccountId } = useGetAccountById()
  const { deleteInstallments } = useDeleteInstallments()

  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const handleNumericInputChange = (count: number | undefined) => {
    if (!count) {
      setInstallmentList([])
      setCount(undefined)
      setIsChange(true)

      return
    }

    const installmentsTemp = []

    if (count === 0 || count > 12) {
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

    //Change the paymentPercentage of each installment when the count changes to be equal to 100/count
    const paymentPercentage = 100 / count
    const defaultObject: InstallmentDto = {
      balanceDue: 0,
      paymentPercentage: paymentPercentage,
      premiumPaymentWarranty: 0,
      settlementDueDate: account ? new Date(account?.informations[0]?.effectiveDate || '') : new Date(),
      idAccount: account ? idAccount : Number(localStorage.getItem('idAccount')),
      id: 0
    }
    for (let i = 0; i < count; i++) {
      const temp = { ...defaultObject, premiumPaymentWarranty: 30 * (i + 1) }
      installmentsTemp[i] = makeCalculates({ ...temp })
    }
    setInstallmentList(installmentsTemp)
    setCount(count)
    setIsChange(true)
  }

  const makeCalculates = (installment: InstallmentDto) => {
    const temp = { ...installment }
    const inceptionDate = account ? new Date(account?.informations[0]?.effectiveDate || '') : null
    const receivedNetPremium = account ? account?.securityTotal?.receivedNetPremium : 0

    if (inceptionDate) {
      const days = temp.premiumPaymentWarranty * 24 * 60 * 60 * 1000
      temp.settlementDueDate = new Date(inceptionDate.getTime() + days)
    }

    if (receivedNetPremium) {
      temp.balanceDue = receivedNetPremium * (temp.paymentPercentage / 100)
    }

    return temp
  }

  const handleItemChange = (index: number, { name, value }: { name: keyof InstallmentDto; value: any }) => {
    const temp = { ...installmentsList[index], [name]: value }

    const newInstalment = makeCalculates(temp)

    setInstallmentList(state => {
      const lastState = [...state]
      lastState[index] = newInstalment
      setDaysFirst(lastState[0]?.premiumPaymentWarranty)

      return lastState
    })
    setIsChange(true)
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

  const getTwoDecimals = (num: number) => {
    const numbers = num.toFixed(2)

    return parseFloat(numbers)
  }

  const validations = async () => {
    if (!count) {
      setBtnNext(false)

      return
    }

    for (let i = 0; i < count; i++) {
      const item = installmentsList[i]
      try {
        await schema.isValid(item, { abortEarly: false })
        const sum = getTwoDecimals(installmentsList.reduce((acc, item) => acc + item.paymentPercentage, 0))
        if (sum === 99.99 || sum === 100) {
          setError({
            ...error,
            error100Percent: false
          })
          setBtnNext(true)
        } else {
          setError({
            ...error,
            error100Percent: true
          })
          setBtnNext(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const saveInstallments = async () => {
    setDisableSaveBtn(true)
    if (isChange) {
      setBadgeData({
        message: `SAVING INSTALLMENTS`,
        status: 'secondary',
        open: true,
        icon: <CircularProgress size={20} color='secondary' />,
        backgroundColor: '#828597',
        theme: 'info',
        disableAutoHide: true
      })
      await deleteInstallments(initialInstallmentList)
      const newInitialInstallments = await addInstallments(installmentsList)
      setIsChange(false)
      setInitialInstallmentList(newInitialInstallments)

      await delayMs(1000)
      setBadgeData({
        message: `SAVED SUCCESSFULLY`,
        status: 'success',
        theme: 'success',
        open: true,
        icon: <Icon icon='ic:baseline-check-circle' />,
        disableAutoHide: true
      })
      await delayMs(1500)
      setBadgeData({
        message: '',
        status: undefined,
        icon: undefined,
        open: false
      })
    }
    setDisableSaveBtn(false)
  }

  const nextStep = () => {
    validations()
    if (onStepChange) {
      saveInstallments()
      onStepChange(4)
    }
  }

  const openModal = () => {
    validations()
    if (count === 0)
      setError({
        ...error,
        erorrRangeInstallments: true
      })
    setOpen(true)
  }

  useEffect(() => {
    const tempInstallments: InstallmentDto[] = []
    const base = daysFirst ? daysFirst : 1

    if (daysFirst && daysFirst != 0) {
      console.log(daysFirst)

      for (const [index, installment] of installmentsList.entries()) {
        let temp = { ...installment }
        const paymentWarrantyResult = base * (index + 1)
        temp.premiumPaymentWarranty = paymentWarrantyResult
        temp = makeCalculates(temp)
        tempInstallments.push(temp)
      }

      setInstallmentList(() => {
        const temp = [...tempInstallments]

        return temp
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysFirst])

  useEffect(() => {
    idAccount && setAccountId(idAccount)
  }, [idAccount, setAccountId])

  useEffect(() => {
    if (account) {
      setCount(account.installments.length)

      //change settlementDueDate
      setTimeout(() => {
        account.installments.forEach((item: any) => {
          item.settlementDueDate = new Date(item.settlementDueDate + 'T00:00:00.678Z')
          item.idAccount = account ? idAccount : Number(localStorage.getItem('idAccount'))
        })
        setInstallmentList([...account.installments])
        setInitialInstallmentList([...account.installments])
      }, 10)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    validations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installmentsList])

  return (
    <>
      <CustomAlert {...badgeData} />
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>
          <InputsContainer>
            <Grid container spacing={{ xs: 2, sm: 5, md: 5 }} rowSpacing={4} columns={12}>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  selected={
                    account?.informations[0]?.effectiveDate ? new Date(account.informations[0].effectiveDate) : null
                  }
                  shouldCloseOnSelect
                  id='Inception date'
                  showTimeSelect
                  timeIntervals={15}
                  customInput={<CustomInput label='Inception date' sx={{ mb: 2, mt: 0, width: '100%' }} />}
                  disabled={true}
                  onChange={() => {
                    return
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NumericFormat
                  fullWidth
                  name='DynamicNetPremium'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={TextField}
                  id='DynamicNetPremium'
                  decimalScale={2}
                  label='Dynamic net premium'
                  multiline
                  variant='outlined'
                  value={account ? account?.securityTotal?.receivedNetPremium : ' '}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <NumericFormat
                  fullWidth
                  name='Installments'
                  thousandSeparator=','
                  customInput={TextField}
                  id='Installments'
                  label='Installments'
                  decimalScale={0}
                  variant='outlined'
                  isAllowed={values => {
                    const { floatValue } = values

                    return (floatValue! > 0 && floatValue! <= 12) || floatValue === undefined
                  }}
                  value={count}
                  onValueChange={value => {
                    handleNumericInputChange(value.floatValue)
                  }}
                  onBlur={handleBlur}
                />
                {error.errorFieldRequired && (
                  <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                )}
                {error.erorrRangeInstallments && (
                  <FormHelperText sx={{ color: 'error.main' }}>This field cannot be 0</FormHelperText>
                )}
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
              daysFirst={installmentsList[0]?.premiumPaymentWarranty || 0}
              onChangeList={handleItemChange}
              globalInfo={{
                receivedNetPremium: account ? account?.securityTotal?.receivedNetPremium : 0,
                inceptionDate: account?.informations[0]?.effectiveDate
                  ? new Date(account.informations[0].effectiveDate)
                  : null,
                idAccount: account ? idAccount : ''
              }}
              count={count}
              key={index}
              error100Percent={error.error100Percent}
            />
          ))}
        </Grid>
      </GeneralContainer>
      <NextContainer>
        <Button
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
          disabled={disableSaveBtn}
          onClick={saveInstallments}
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
          onClick={openModal}
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
