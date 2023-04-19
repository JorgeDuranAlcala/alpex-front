import { ForwardedRef, forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from "@mui/material/InputLabel"
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

// ** Components

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface PickerProps {
  label?: string
}
interface BasicInfo {
  insured: string
  country: string
  broker: string
  brokerContact: string
  cedant: string
  cedantContact: string
  lineOfBusiness: string
  underwriter: string
  leadUnderwriter: string
  technicalAssistant: string
}

const initialBasicInfo: BasicInfo = {
  insured: '',
  country: '',
  broker: '',
  brokerContact: '',
  cedant: '',
  cedantContact: '',
  lineOfBusiness: '',
  underwriter: '',
  leadUnderwriter: '',
  technicalAssistant: '',
}

interface ContactData {
  name: string
  email: string
  phone: string
  country: string
}

const initialContactData: ContactData = {
  name: '',
  email: '',
  phone: '',
  country: '',

}

const expresions = {

  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email:
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
  phone: /^\d{10}$/, // 7 a 10 numeros.
};

/* eslint-disable */
const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      id="date-textfield"
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarTodayIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />

  )
})


const ModalContact = ({ id }) => {
  const [contactData, setContactData] = useState<ContactData>(initialContactData)
  const [open, setOpen] = useState<boolean>(false)
  const [btnDisable, setBtnDisable] = useState(true)
  const [startValidations, setStartValidations] = useState(false)
  const [error, setError] = useState(true)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [emptyForm, setEmptyForm] = useState(true)



  useEffect(
    () => {
      if (contactData.name !== undefined && contactData.name !== ""
        && contactData.email !== undefined && contactData.email !== ""
        && contactData.phone !== undefined && contactData.phone !== ""
        && contactData.country !== undefined && contactData.country !== "") {
        setEmptyForm(false)
      } else {
        setEmptyForm(true)
        setError(true)
      }

      if (startValidations) {
        if (expresions.name.test(contactData.name)) {
          setNameError(false)
        } else {
          setNameError(true)
          setError(true)
        }

        if (expresions.email.test(contactData.email)) {
          setEmailError(false)
        } else {
          setEmailError(true)
          setError(true)
        }

        if (expresions.phone.test(contactData.phone)) {
          setPhoneError(false)
        } else {
          setPhoneError(true)
          setError(true)
        }

        if (contactData.country !== undefined && contactData.country !== "") {
          setCountryError(false)
        } else {
          setCountryError(true)
          setError(true)
        }

        if (!nameError && !emailError && !phoneError && !countryError && !emptyForm) {
          setError(false)
        } else {
          setError(true)
        }

      }
      if (error)
        setBtnDisable(true)
      else if (!error)
        setBtnDisable(false)
    }, [contactData.name,
    contactData.email,
    contactData.phone,
    contactData.country,
    error,
    nameError,
    emailError,
    phoneError,
    countryError,
    emptyForm])


  const handleChange = (field: keyof ContactData, value: ContactData[keyof ContactData]) => {
    setStartValidations(true)
    setContactData({ ...contactData, [field]: value })

  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateContact = () => {
    console.log("createContact")
  }
  return (
    <>
      <Button className="create-contact-btn" onClick={() => setOpen(true)}>
        <div className="btn-icon">
          <Icon icon='mdi:plus-circle-outline' />
        </div>
        CREATE NEW CONTACT
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            bgcolor: "white",
            top: "50%",
            left: "50%",
            boxShadow: 24,
            pl: 5,
            pr: 5,
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: "15px"
          }}
        >
          <HeaderTitleModal>
            <Typography variant='h6'>Create new contact</Typography>
            <ButtonClose onClick={handleClose}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className="contact-form">
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

              <TextField
                autoFocus
                label='Contact Name'
                value={contactData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              {nameError && <FormHelperText sx={{ color: 'error.main' }}>Invalid name</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

              <TextField
                autoFocus
                label='Contact email'
                value={contactData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />

              {emailError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

              <TextField
                autoFocus
                label='Contact Phone'
                value={contactData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />

              {phoneError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={contactData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                labelId='invoice-country'
              >
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Russia'>Russia</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Canada'>Canada</MenuItem>
              </Select>

              {countryError && (
                <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                  Select a country
                </FormHelperText>
              )}
            </FormControl>

          </div>
          <Button
            className="create-contact-modal"
            disabled={btnDisable}
            variant='contained'
            onClick={handleCreateContact}>
            CREATE
          </Button>
          <Button
            className="create-contact-modal"
            onClick={() => setOpen(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}

const BasicInfo = () => {

  const [receptionDate, setReceptionDate] = useState<DateType>(null)
  const [effectiveDate, setEffectiveDate] = useState<DateType>(null)
  const [expirationDate, setExpirationDate] = useState<DateType>(null)
  const [formData, setFormData] = useState<BasicInfo>(initialBasicInfo)

  const handleFormChange = (field: keyof BasicInfo, value: BasicInfo[keyof BasicInfo]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <>
      <div className="title">Basic info</div>
      <div className="form-wrapper">
        <div className="form-col">
          <div className="title">Insured</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

            <TextField
              autoFocus
              label='insured'
              value={formData.insured}
              onChange={(e) => handleFormChange('insured', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Country</InputLabel>

            <Select
              label='Country'
              value={formData.country}
              onChange={(e) => handleFormChange('country', e.target.value)}
              labelId='invoice-country'
            >
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Russia'>Russia</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Canada'>Canada</MenuItem>
            </Select>

            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                Select a country
              </FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="form-col">
          <div className="title">Broker</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Broker</InputLabel>

            <Select
              label='Select Broker'
              value={formData.broker}
              onChange={(e) => handleFormChange('broker', e.target.value)}
              labelId='broker'
            >
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select Broker
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Broker Contact</InputLabel>

            <Select
              label='Select Broker Contact'
              value={formData.brokerContact}
              onChange={(e) => handleFormChange('brokerContact', e.target.value)}
              labelId='broker-contact'

            >
              <MenuItem value='brc1'>Broker contact 1</MenuItem>
              <MenuItem value='brc2'>Broker contact 2</MenuItem>
            </Select>
          </FormControl>
          <ModalContact id='modal-broker' />
        </div>
        <div className="form-col">
          <div className="title">Cedant</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Cedant</InputLabel>

            <Select
              label='Select Cedant'
              value={formData.cedant}
              onChange={(e) => handleFormChange('cedant', e.target.value)}
              labelId='cedant'
            >
              <MenuItem value='cedant1'>cedant 1</MenuItem>
              <MenuItem value='cedant2'>cedant 2</MenuItem>
              <MenuItem value='cedant3'>cedant 3</MenuItem>
            </Select>

            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='select-cedant-error'>
                Please select Cedant
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Cedant Contact</InputLabel>

            <Select
              label='Select Cedant Contact'
              value={formData.cedantContact}
              onChange={(e) => handleFormChange('cedantContact', e.target.value)}
              labelId='cedant-contact'
            >
              <MenuItem value='cedantc1'>Cedant contact 1</MenuItem>
              <MenuItem value='cedantc2'>Cedant contact 2</MenuItem>
            </Select>
          </FormControl>
          <ModalContact id='modal-broker' />
        </div>
        <div className="form-col">
          <div className="title">Business</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Line of business</InputLabel>

            <Select
              label='Line of Business'
              value={formData.lineOfBusiness}
              onChange={(e) => handleFormChange('lineOfBusiness', e.target.value)}
              labelId='business'
            >
              <MenuItem value='lb1'>Lb 1</MenuItem>
              <MenuItem value='lb2'>Lb 2</MenuItem>
              <MenuItem value='lb3'>Lb 3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='business-error'>
                Please select a line of business
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="form-col">
          <div className="title">Dates</div>
          <DatePickerWrapper>

            <DatePicker

              selected={receptionDate}
              shouldCloseOnSelect
              id='reception-date'
              customInput={
                <CustomInput
                  label='Reception date'
                  sx={{ mb: 2, mt: 2, width: "100%" }}
                />
              }
              onChange={(date: Date) => setReceptionDate(date)}

            />


            <DatePicker
              selected={effectiveDate}
              shouldCloseOnSelect
              id='effective-date'
              customInput={
                <CustomInput
                  label='Effective date'
                  sx={{ mb: 2, mt: 2, width: "100%" }}
                />
              }
              onChange={(date: Date) => setEffectiveDate(date)}

            />
            <DatePicker
              selected={expirationDate}
              shouldCloseOnSelect
              id='expiration-date'
              customInput={
                <CustomInput
                  label='Expiration date'
                  sx={{ mb: 2, mt: 2, width: "100%" }}
                />
              }
              onChange={(date: Date) => setExpirationDate(date)}

            />
          </DatePickerWrapper>


        </div>
        <div className="form-col">
          <div className="title">Underwriter team</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Underwriter</InputLabel>

            <Select
              label='Underwriter'
              value={formData.underwriter}
              onChange={(e) => handleFormChange('underwriter', e.target.value)}
              labelId='underwriter'
            >
              <MenuItem value='u1'>U1</MenuItem>
              <MenuItem value='u2'>U2</MenuItem>
              <MenuItem value='u3'>U3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Lead underwriter</InputLabel>

            <Select
              label='Lead Underwriter'
              value={formData.leadUnderwriter}
              onChange={(e) => handleFormChange('leadUnderwriter', e.target.value)}
              labelId='lead-underwriter'
            >
              <MenuItem value='Lu1'>LU1</MenuItem>
              <MenuItem value='Lu2'>LU2</MenuItem>
              <MenuItem value='Lu3'>LU3</MenuItem>
            </Select>

          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Technical assistant</InputLabel>

            <Select
              label='Technical assistant'
              value={formData.technicalAssistant}
              onChange={(e) => handleFormChange('technicalAssistant', e.target.value)}
              labelId='assistant'
            >
              <MenuItem value='assistant1'>Assistant 1</MenuItem>
              <MenuItem value='assistant2'>Assistant 2</MenuItem>
              <MenuItem value='assistant3'>Assistant 3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  )
}

const PlacementStructure = () => {

  // const [formData, setFormData] = useState<PlacementData>(initialPlacementData)
  const [currency, setCurrency] = useState<string>()
  const [total, setTotal] = useState<number>()
  const [sir, setSir] = useState<number>()
  const [reinsuranceBrokerageP, setReinsuranceBrokerageP] = useState<number>()
  const [taxesP, setTaxesP] = useState<number>()
  const [frontingFeeP, setFrontingFeeP] = useState<number>()
  const [netPremium, setNetPremium] = useState<number>()
  const [exchangeRate, setExchangeRate] = useState<number>()
  const [limit, setLimit] = useState<number>()
  const [grossPremium, setGrossPremium] = useState<number>()
  const [reinsuranceBrokerage, setReinsuranceBrokerage] = useState<number>()
  const [taxes, setTaxes] = useState<number>()
  const [frontingFee, setFrontingFee] = useState<number>()
  const [attachmentPoint, setAttachmentPoint] = useState<number>()
  const [typeOfLimit, setTypeOfLimit] = useState<string>()

  const calculate = async (type: string) => {
    console.log(type)
    const grossPremiumc: number = grossPremium || 0
    const reinsuranceBrokeragePc: number = reinsuranceBrokerageP || 0
    const reinsuranceBrokeragec: number = reinsuranceBrokerage || 0
    const taxesPc: number = taxesP || 0
    const taxesc: number = taxes || 0
    const frontingFeePc: number = frontingFeeP || 0
    const frontingFeec: number = frontingFee || 0

    switch (type) {
      case 'reinsuranceBrokerageP': {
        console.log(grossPremiumc)
        console.log(reinsuranceBrokeragePc)
        const result = grossPremiumc * (reinsuranceBrokeragePc / 100)
        setReinsuranceBrokerage(isFinite(result) ? result : 0)

        break
      }
      case 'reinsuranceBrokerage': {
        const result = reinsuranceBrokeragec * 100 / grossPremiumc
        console.log("resulttt")
        console.log(result)
        setReinsuranceBrokerageP(isFinite(result) ? result : 0)
        break
      }
      case 'taxes': {
        const result = (taxesc * 100) / grossPremiumc
        setTaxesP(isFinite(result) ? result : 0)
        break
      }
      case 'taxesP': {
        const result = grossPremiumc * (taxesPc / 100)
        setTaxes(isFinite(result) ? result : 0)
        break
      }
      case 'frontingFeeP': {
        const result = grossPremiumc * (frontingFeePc / 100)
        setFrontingFee(isFinite(result) ? result : 0)
        break
      }
      case 'frontingFee': {
        const result = frontingFeec * 100 / grossPremiumc
        setFrontingFeeP(isFinite(result) ? result : 0)
        break
      }
      case 'grossPremium': {
        const resultBrokerage = reinsuranceBrokeragec * 100 / grossPremiumc
        const resultTaxes = taxesPc * 100 / grossPremiumc
        const resultFronting = frontingFeec * 100 / grossPremiumc
        setReinsuranceBrokerageP(isFinite(resultBrokerage) ? resultBrokerage : 0)
        setTaxesP(isFinite(resultTaxes) ? resultTaxes : 0)
        setFrontingFeeP(isFinite(resultFronting) ? resultFronting : 0)
        break
      }
    }
    const reinsuranceBrokerageTotalFinal = reinsuranceBrokerage ? reinsuranceBrokerage : 0
    const taxesFinal = taxes ? taxes : 0
    const frontingFeeTotalFinal = frontingFee ? frontingFee : 0
    setNetPremium(grossPremiumc - reinsuranceBrokerageTotalFinal - taxesFinal - frontingFeeTotalFinal)


  }

  const handleCurrencyChange = (value: any) => {
    console.log(value)
    switch (value) {
      case 'USD':
        setExchangeRate(18.50)
        break;
      case 'EUR':
        setExchangeRate(20.00)
        break;
      case 'MXN':
        setExchangeRate(1)
        break;
    }
  }
  const handleFormChange = (field: keyof PlacementData, value: any) => {
    console.log(value)
    // setFormData({ ...formData, [field]: value })
    // console.log(formData)
  }
  return (
    <>
      <div className="title">Placement Structure</div>
      <div className="form-wrapper">
        <div className="form-col">
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              id='currency'
              label='Currency'
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value)
                handleCurrencyChange(e.target.value)
              }}
              labelId='currency'
            >
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='MXN'>MXN</MenuItem>
              <MenuItem value='EUR'>EUR</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                Select a currency
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={total}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="filled-multiline-flexible"
              label="Total values"
              multiline
              prefix={'$'}
              decimalScale={2}
              variant="outlined"
              onValueChange={(value, e) => { setTotal(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={sir}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="sir"
              label="SIR"
              multiline
              prefix={'$'}
              decimalScale={2}
              variant="outlined"
              onValueChange={(value, e) => { setSir(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={reinsuranceBrokerageP}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="reinsurance-brokerage"
              label="Reinsurance brokerage %"
              multiline
              prefix={'%'}
              decimalScale={2}
              variant="outlined"
              onBlur={() => calculate('reinsuranceBrokerageP')}
              onValueChange={(value, e) => { setReinsuranceBrokerageP(value.floatValue) }}

            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={taxesP}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="taxes-p"
              label="Taxes %"
              multiline
              prefix={'%'}
              decimalScale={2}
              variant="outlined"
              onBlur={() => calculate('taxesP')}
              onValueChange={(value, e) => { setTaxesP(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

            <NumericFormat
              value={frontingFeeP}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="fronting-fee-p"
              label="Fronting fee %"
              multiline
              prefix={'%'}
              maxRows={4}
              decimalScale={2}
              variant="outlined"
              onBlur={() => calculate('frontingFeeP')}
              onValueChange={(value, e) => { setFrontingFeeP(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={netPremium}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              disabled
              id="net-premium"
              label="Net premium"
              multiline
              variant="outlined"
              decimalScale={2}
              onValueChange={(value, e) => { setNetPremium(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

        </div>

        <div className="form-col">
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={exchangeRate}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="exchange-rate"
              label="Exchange rate"
              multiline
              variant="outlined"
              decimalScale={2}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={limit}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="limit"
              label="Limit"
              multiline
              variant="outlined"
              decimalScale={2}
              onValueChange={(value, e) => { setLimit(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={grossPremium}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="gross-premium"
              label="Gross Premium"
              multiline
              variant="outlined"
              decimalScale={2}
              onBlur={() => calculate('grossPremium')}
              onValueChange={(value, e) => { setGrossPremium(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={reinsuranceBrokerage}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="reinsurance-brokerage"
              label="Reinsurance Brokerage"
              multiline
              variant="outlined"
              decimalScale={2}
              onBlur={() => calculate('reinsuranceBrokerage')}
              onValueChange={(value, e) => { setReinsuranceBrokerage(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={taxes}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="taxes"
              label="Taxes"
              multiline
              variant="outlined"
              decimalScale={2}
              onBlur={() => calculate('taxes')}
              onValueChange={(value, e) => { setTaxes(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={frontingFee}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="fornting-fee"
              label="Fronting fee"
              multiline
              variant="outlined"
              decimalScale={2}
              onBlur={() => calculate('frontingFee')}
              onValueChange={(value, e) => { setFrontingFee(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
        </div>
        <div className="form-col">
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={attachmentPoint}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="attachment-point"
              label="Attachment point"
              multiline
              variant="outlined"
              decimalScale={2}
              onValueChange={(value, e) => { setAttachmentPoint(value.floatValue) }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Type of limit</InputLabel>
            <Select
              label='Type of Limit'
              value={typeOfLimit}
              onChange={e => setTypeOfLimit(e.target.value)}
              labelId='type-of-limit'

            >
              <MenuItem value='t1'>T1</MenuItem>
              <MenuItem value='t2'>T2</MenuItem>
              <MenuItem value='t3'>T3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='invoice-country-error'>
                Select a Type of limit
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
    </>
  )
}

// const FileSubmit = () => {

//     // ** State
//     const [files, setFiles] = useState<File[]>([])

//     // ** Hooks
//     const { getRootProps, getInputProps } = useDropzone({
//       maxFiles: 2,
//       maxSize: 2000000,
//       accept: {
//         'image/*': ['.png', '.jpg', '.jpeg', '.gif']
//       },
//       onDrop: (acceptedFiles: File[]) => {
//         setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
//       },
//       onDropRejected: () => {
//         toast.error('You can only upload 2 files & maximum size of 2 MB.', {
//           duration: 2000
//         })
//       }
//     })

//     const renderFilePreview = (file: FileProp) => {
//       if (file.type.startsWith('image')) {
//         return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
//       } else {
//         return <Icon icon='mdi:file-document-outline' />
//       }
//     }

//     const handleRemoveFile = (file: FileProp) => {
//       const uploadedFiles = files
//       const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
//       setFiles([...filtered])
//     }

//     const fileList = files.map((file: FileProp) => (
//       <ListItem key={file.name}>
//         <div className='file-details'>
//           <div className='file-preview'>{renderFilePreview(file)}</div>
//           <div>
//             <Typography className='file-name'>{file.name}</Typography>
//             <Typography className='file-size' variant='body2'>
//               {Math.round(file.size / 100) / 10 > 1000 ? (((Math.round(file.size / 100) / 10000).toFixed(1)) mb ) : (((Math.round(file.size / 100) / 10).toFixed(1)) kb) }
//             </Typography>
//           </div>
//         </div>
//         <IconButton onClick={() => handleRemoveFile(file)}>
//           <Icon icon='mdi:close' fontSize={20} />
//         </IconButton>
//       </ListItem>
//     ))

//     const handleRemoveAllFiles = () => {
//       setFiles([])
//     }

//     return (
//       <Fragment>
//         <div {...getRootProps({ className: 'dropzone' })}>
//           <input {...getInputProps()} />
//           <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
//             <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
//             <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
//               <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
//               <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
//               <Typography color='textSecondary'>Max 2 files and max size of 2 MB</Typography>
//             </Box>
//           </Box>
//         </div>
//         {files.length ? (
//           <Fragment>
//             <List>{fileList}</List>
//             <div className='buttons'>
//               <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
//                 Remove All
//               </Button>
//               <Button variant='contained'>Upload Files</Button>
//             </div>
//           </Fragment>
//         ) : null}
//       </Fragment>
//     )

// }

const Information = () => {

  const handleSubmit = () => {
    console.log("elsubmit")
  };
  const { control, formState: { errors } } = useForm();

  return (
    <>
      <div className='information'>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className="section">
            <BasicInfo />
          </div>

          <div className="section">
            <PlacementStructure />
          </div>

          <div className="section">
            <div className="title">File submit</div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Information

