import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { default as DatePicker } from 'react-datepicker'

// ** MUI Imports
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  Modal,
  SxProps,
  TextField,
  Theme,
  Typography
} from '@mui/material'

// ** Config
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/store'
import { updateEndorsement } from 'src/store/apps/endorsement'

// ** Components
import { NumericFormat } from 'react-number-format'
import CardInstallment from 'src/layouts/components/CardInstallment'
import {
  GeneralContainer,
  InputsContainer,
  NextContainer,
  TitleContainer
} from 'src/styles/Forms/PaymentWarranty/paymentWarranty'

// ** Custom Hooks
import { useGetAccountById } from '@/hooks/accounts/forms'
import * as yup from 'yup'

// ** Dtos
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'

// ** Styles
import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'

// ** Utils
import { DisableForm } from '@/views/accounts/new-account-steps/_commons/DisableForm'

// ** Nextjs
import { useRouter } from 'next/router'

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
  disableSectionCtrl?: boolean
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
const PaymentWarranty: React.FC<InformationProps> = ({ onStepChange, disableSectionCtrl }) => {
  const router = useRouter()
  const idAccountRouter = Number(router?.query?.idAccount)

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const texButtonColor = userThemeConfig.palette?.buttonText.primary
  const [installmentsList, setInstallmentList] = useState<InstallmentDto[]>([])

  const [check, setCheck] = useState<boolean>(false)
  const [count, setCount] = useState<number>()
  const [btnNext, setBtnNext] = useState<boolean>(false)
  const [daysFirst, setDaysFirst] = useState<number>()
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<InstallmentErrors>({
    errorFieldRequired: false,
    erorrRangeInstallments: false,
    errorOnlyNumbers: false,
    error100Percent: false
  })

  // Redux
  const endorsementData = useAppSelector(state => state.endorsement.data)
  const dispatch = useAppDispatch()

  // Custom hooks
  const { account: accountData, setAccountId, setAccount } = useGetAccountById()

  const handleNumericInputChange = (count: number | undefined) => {
    clearInterval(typingTimer)

    // Iniciar un nuevo intervalo
    typingTimer = setInterval(() => {
      // Código a ejecutar cuando se deja de escribir
      setCount(count)
      if (!count || count === 0 || count > 12) {
        setInstallmentList([])

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
        settlementDueDate: accountData ? new Date(accountData?.informations[0]?.effectiveDate || '') : new Date(),
        idAccount: idAccountRouter,
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
    if (accountData) {
      accountDate = accountData?.informations[0]?.effectiveDate?.toString().replace('Z', '') || ''
    }
    const inceptionDate = accountDate ? new Date(accountDate) : null

    const receivedNetPremium =
      accountData && accountData.securitiesTotal.length > 0 ? accountData?.securitiesTotal[0]?.receivedNetPremium : 0

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
    const installmentsLisTemp = [...installmentsList]

    const newInstallment = makeCalculates(temp)
    installmentsLisTemp[index] = newInstallment
    setInstallmentList(installmentsLisTemp)
    setDaysFirst(installmentsLisTemp[0].premiumPaymentWarranty)

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
    if (!endorsementData.initialized) return
    const newEndorsementData = {
      ...endorsementData,
      installments: installmentsList
    }
    dispatch(updateEndorsement(newEndorsementData))
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
    if (idAccountRouter && !endorsementData.initialized) {
      setAccountId(idAccountRouter)
    } else if (endorsementData) {
      setAccount({
        id: idAccountRouter,
        status: '',
        discounts: endorsementData.discounts,
        idAccountStatus: 0,
        idAccountType: 0,
        informations: [
          {
            ...endorsementData.information,
            idLineOfBussines: {},
            idCountry: {},
            idBroker: {},
            idCedant: {},
            idRiskActivity: {},
            idTypeOfLimit: {},
            idCurrency: {},
            idBrokerContact: {},
            idCedantContact: {},
            idEconomicSector: {},
            idLeadUnderwriter: {},
            idTechnicalAssistant: {},
            idUnderwriter: {}
          }
        ],
        installments: endorsementData.installments,
        securities: endorsementData.securities,
        securitiesTotal: endorsementData.securitiesTotal,
        sublimits: endorsementData.sublimits
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAccountRouter, setAccountId])

  useEffect(() => {
    if (accountData && accountData.installments.length > 0) {
      setCount(accountData.installments.length)
      const installments = [...accountData.installments]

      if (!endorsementData.initialized)
        for (const item of installments) {
          item.settlementDueDate = new Date(item.settlementDueDate + 'T00:00:00.678Z')
          item.idAccount = idAccountRouter
        }

      setInstallmentList([...installments])
    }

    if (accountData && !check) {
      setCheck(true)
      const corte = new String(accountData!.informations[0].effectiveDate!)
      const corte2 = Date.parse(corte.substring(0, 10))
      const fecha = new Date(corte2)
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
      accountData!.informations[0].effectiveDate = fecha
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData, idAccountRouter])

  //todo probar en un momento
  useEffect(() => {
    installmentsList.length > 0 && validations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installmentsList])

  return (
    <Grid container xs={12} sm={12}>
      <GeneralContainer>
        <TitleContainer>
          <Typography variant='h5'>Payment warranty</Typography>

          <DisableForm isDisabled={disableSectionCtrl} sg={2000}>
            <InputsContainer>
              <Grid container spacing={{ xs: 2, sm: 5, md: 5 }} rowSpacing={4} columns={12}>
                <Grid item xs={12} sm={6} md={4}>
                  <DatePicker
                    selected={
                      accountData?.informations[0]?.effectiveDate
                        ? new Date(accountData?.informations[0]?.effectiveDate)
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
                    value={accountData ? accountData?.securitiesTotal[0]?.receivedNetPremium : ' '}
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
        <DisableForm isDisabled={disableSectionCtrl} sg={2000}>
          <Grid container spacing={2}>
            {installmentsList.map((installment, index) => (
              <CardInstallment
                index={index}
                installment={installment}
                daysFirst={installment.premiumPaymentWarranty || 0}
                onChangeList={handleItemChange}
                globalInfo={{
                  receivedNetPremium: accountData ? accountData?.securitiesTotal[0]?.receivedNetPremium : 0,
                  inceptionDate: accountData?.informations[0]?.effectiveDate
                    ? new Date(accountData.informations[0].effectiveDate)
                    : null,
                  idAccount: accountData ? idAccountRouter : 0
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
