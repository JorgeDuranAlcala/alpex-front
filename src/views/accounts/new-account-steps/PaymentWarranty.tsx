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
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'

import { default as DatePicker } from 'react-datepicker'

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
import { DisableForm } from './_commons/DisableForm'

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
type Timer = ReturnType<typeof setInterval>
let typingTimer: Timer
const doneTypingInterval = 1500 // Tiempo en milisegundos para considerar que se dejó de escribir
const PaymentWarranty: React.FC<InformationProps> = ({ onStepChange }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary
  const [installmentsList, setInstallmentList] = useState<InstallmentDto[]>([])
  const [initialInstallmentList, setInitialInstallmentList] = useState<InstallmentDto[]>([])

  const [check, setCheck] = useState<boolean>(false)
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
  const newAccount = account

  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const handleNumericInputChange = (count: number | undefined) => {
    clearInterval(typingTimer)

    // Iniciar un nuevo intervalo
    typingTimer = setInterval(() => {
      // Código a ejecutar cuando se deja de escribir
      setCount(count)
      if (!count || count === 0 || count > 12) {
        setInstallmentList([])

        setIsChange(true)

        setError({
          ...error,
          erorrRangeInstallments: count ? count > 12 : count === 0,
          errorFieldRequired: !count
        })

        return
      }
      const installmentsTemp = []

      //Change the paymentPercentage of each installment when the count changes to be equal to 100/count
      const fixedPercentageString = Math.floor((100 / count) * 100) / 100 // toFixed returns a string with the percentage fixed
      const fixedPercentage = +fixedPercentageString //Parse fixed percentage String to Number
      const lastPercentage = 100 - fixedPercentage * (count - 1) //Calculate the last/residual percentage.
      const defaultObject: InstallmentDto = {
        balanceDue: 0,
        paymentPercentage: fixedPercentage,
        premiumPaymentWarranty: 0,
        settlementDueDate: account ? new Date(account?.informations[0]?.effectiveDate || '') : new Date(),
        idAccount: account ? idAccount : Number(localStorage.getItem('idAccount')),
        id: 0
      }
      for (let i = 0; i < count; i++) {
        if (i < count - 1) {
          const temp = { ...defaultObject, premiumPaymentWarranty: 30 * (i + 1) }
          installmentsTemp[i] = makeCalculates({ ...temp })
        } else {
          const temp = { ...defaultObject, paymentPercentage: lastPercentage, premiumPaymentWarranty: 30 * (i + 1) }
          installmentsTemp[i] = makeCalculates({ ...temp })
        }
      }

      setInstallmentList(installmentsTemp)

      setIsChange(true)
      setError({
        ...error,
        erorrRangeInstallments: false,
        errorFieldRequired: false
      })
      setBtnNext(true)

      // Limpiar el intervalo
      clearInterval(typingTimer)
    }, doneTypingInterval)
  }

  const makeCalculates = (installment: InstallmentDto) => {
    const temp = { ...installment }
    let accountDate = ''
    if (account) {
      accountDate = account?.informations[0]?.effectiveDate?.toString().replace('Z', '') || ''
    }
    const inceptionDate = accountDate ? new Date(accountDate) : null

    const receivedNetPremium =
      account && account.securitiesTotal.length > 0 ? account?.securitiesTotal[0]?.receivedNetPremium : 0

    if (inceptionDate) {
      const days = temp.premiumPaymentWarranty * 24 * 60 * 60 * 1000
      temp.settlementDueDate = new Date(inceptionDate.getTime() + days)

      // console.log({
      //   account: account?.informations[0]?.effectiveDate,
      //   inceptionDate,
      //   warranty: temp.premiumPaymentWarranty,
      //   days,
      //   settlementDueDate: temp.settlementDueDate
      // })
      // debugger;
    }

    if (receivedNetPremium) {
      temp.balanceDue = receivedNetPremium * (temp.paymentPercentage / 100)
    }

    return temp
  }

  const handleItemChange = (index: number, { name, value }: { name: keyof InstallmentDto; value: any }) => {
    const temp = { ...installmentsList[index], [name]: value }
    const installmentsLisTemp = [...installmentsList]

    const newInstallment = makeCalculates(temp)
    installmentsLisTemp[index] = newInstallment
    setInstallmentList(installmentsLisTemp)
    setDaysFirst(installmentsLisTemp[0].premiumPaymentWarranty)

    setIsChange(true)
    setCheck(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAccount, setAccountId])

  useEffect(() => {
    if (account && account.installments.length > 0) {
      setCount(account.installments.length)
      const installments = [...account.installments]
      for (const item of installments) {
        item.settlementDueDate = new Date(item.settlementDueDate + 'T00:00:00.678Z')
        item.idAccount = account ? idAccount : Number(localStorage.getItem('idAccount'))
      }

      setInstallmentList([...installments])
      setInitialInstallmentList([...installments])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (newAccount && !check) {
      setCheck(true)
      const corte = new String(newAccount!.informations[0].effectiveDate!)
      const corte2 = Date.parse(corte.substring(0, 10))
      const fecha = new Date(corte2)
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
      newAccount!.informations[0].effectiveDate = fecha
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, newAccount, idAccount])

  //todo probar en un momento
  useEffect(() => {
    installmentsList.length > 0 && validations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installmentsList])

  return (
    <Grid container xs={12} sm={12}>
      <CustomAlert {...badgeData} />
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>

          <DisableForm isDisabled={account?.status.toLowerCase() === 'bound' ? true : false}>
            <InputsContainer>
              <Grid container spacing={{ xs: 2, sm: 5, md: 5 }} rowSpacing={4} columns={12}>
                <Grid item xs={12} sm={6} md={4}>
                  <DatePicker
                    selected={
                      newAccount?.informations[0]?.effectiveDate
                        ? new Date(newAccount?.informations[0]?.effectiveDate)
                        : null
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
                    dateFormat={'dd/MM/yyyy'}
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
                    label='Dynamic net premium'
                    multiline
                    variant='outlined'
                    value={account ? account?.securitiesTotal[0]?.receivedNetPremium : ' '}
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
                    value={count}
                    onValueChange={value => {
                      handleNumericInputChange(value.floatValue)
                    }}
                  />
                  {error.errorFieldRequired && (
                    <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                  )}
                  {error.erorrRangeInstallments && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {count && count > 12 ? 'This field cannot be greater than 12' : 'This field cannot be 0'}
                    </FormHelperText>
                  )}
                  {error.errorOnlyNumbers && <FormHelperText sx={{ color: 'error.main' }}>Only numbers</FormHelperText>}
                </Grid>
              </Grid>
            </InputsContainer>
          </DisableForm>
        </TitleContainer>
        <DisableForm isDisabled={account?.status.toLowerCase() === 'bound' ? true : false}>
          <Grid container spacing={2}>
            {installmentsList.map((installment, index) => (
              <CardInstallment
                index={index}
                installment={installment}
                daysFirst={installment.premiumPaymentWarranty || 0}
                onChangeList={handleItemChange}
                globalInfo={{
                  receivedNetPremium: account ? account?.securitiesTotal[0]?.receivedNetPremium : 0,
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
        </DisableForm>
      </GeneralContainer>
      <NextContainer>
        <Button
          className='btn-full-mob'
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
          disabled={disableSaveBtn || account?.status.toLowerCase() === 'bound' ? true : false}
          onClick={saveInstallments}
        >
          <SaveIcon /> &nbsp; Save changes
        </Button>
        <Button
          className='btn-full-mob'
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
              left: { xs: '8%', md: '50%' },
              boxShadow: 24,
              pl: 5,
              pr: 5,
              transform: { xs: 'translate(-4%, -50%)', md: 'translate(-50%, -50%)' },
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
    </Grid>
  )
}

export default PaymentWarranty
