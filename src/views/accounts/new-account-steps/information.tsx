import React, { ForwardedRef, Fragment, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import UserThemeOptions from 'src/layouts/UserThemeOptions';

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers';

// ** Components

// ** Third Party Imports
import DatePicker from 'react-datepicker';
import { NumericFormat } from 'react-number-format';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// ** Types
// import { DateType } from 'src/types/forms/reactDatepickerTypes';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}

interface ContactData {
  name: string
  email: string
  phone: string
  country: string
}

interface IModal {
  id: string
}

type BasicInfoProps = {
  basicInfo: {
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
    receptionDate: Date
    effectiveDate: Date
    expirationDate: Date
  };
  setBasicInfo: React.Dispatch<
    React.SetStateAction<{
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
      receptionDate: Date
      effectiveDate: Date
      expirationDate: Date
    }>
  >;
};

type PlacementStructureProps = {
  placementStructure: {
    currency: string
    total: number
    sir: number
    reinsuranceBrokerageP: number | undefined
    taxesP: number | undefined
    frontingFeeP: number | undefined
    netPremium: number | undefined
    exchangeRate: number
    limit: number
    grossPremium: number | undefined
    reinsuranceBrokerage: number | undefined
    taxes: number | undefined
    frontingFee: number | undefined
    attachmentPoint: number
    typeOfLimit: string
  };
  setPlacementStructure: React.Dispatch<
    React.SetStateAction<{
      currency: string
      total: number
      sir: number
      reinsuranceBrokerageP: number | undefined
      taxesP: number | undefined
      frontingFeeP: number | undefined
      netPremium: number | undefined
      exchangeRate: number
      limit: number
      grossPremium: number | undefined
      reinsuranceBrokerage: number | undefined
      taxes: number | undefined
      frontingFee: number | undefined
      attachmentPoint: number
      typeOfLimit: string
    }>
  >;
  makeValidations: boolean;
  resetMakeValidations: () => void;

};

type UserFileProps = {
  userFile: {
    file: File | null
  };
  setUserFile: React.Dispatch<
    React.SetStateAction<{
      file: File | null
    }>
  >;
};

const initialContactData: ContactData = {
  name: '',
  email: '',
  phone: '',
  country: ''
}


const expresions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email:
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
  phone: /^\d{10}$/ // 7 a 10 numeros.
}

/* eslint-disable */
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

const ModalContact = ({ id }: IModal) => {
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

  useEffect(() => {
    if (
      contactData.name !== undefined &&
      contactData.name !== '' &&
      contactData.email !== undefined &&
      contactData.email !== '' &&
      contactData.phone !== undefined &&
      contactData.phone !== '' &&
      contactData.country !== undefined &&
      contactData.country !== ''
    ) {
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

      if (contactData.country !== undefined && contactData.country !== '') {
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
    if (error) setBtnDisable(true)
    else if (!error) setBtnDisable(false)
  }, [
    contactData.name,
    contactData.email,
    contactData.phone,
    contactData.country,
    error,
    nameError,
    emailError,
    phoneError,
    countryError,
    emptyForm
  ])

  const handleChange = (field: keyof ContactData, value: ContactData[keyof ContactData]) => {
    setStartValidations(true)
    setContactData({ ...contactData, [field]: value })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateContact = () => {
    console.log('createContact')
  }
  return (
    <>
      <Button className='create-contact-btn' onClick={() => setOpen(true)}>
        <div className='btn-icon'>
          <Icon icon='mdi:plus-circle-outline' />
        </div>
        CREATE NEW CONTACT
      </Button>
      <Modal open={open} onClose={handleClose}>
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
            <Typography variant='h6'>Create new contact</Typography>
            <ButtonClose onClick={handleClose}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Name'
                value={contactData.name}
                onChange={e => handleChange('name', e.target.value)}
              />

              {nameError && <FormHelperText sx={{ color: 'error.main' }}>Invalid name</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact email'
                value={contactData.email}
                onChange={e => handleChange('email', e.target.value)}
              />

              {emailError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Contact Phone'
                value={contactData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />

              {phoneError && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Select country</InputLabel>

              <Select
                label='Select country'
                value={contactData.country}
                onChange={e => handleChange('country', e.target.value)}
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
            className='create-contact-modal'
            disabled={btnDisable}
            variant='contained'
            onClick={handleCreateContact}
          >
            CREATE
          </Button>
          <Button className='create-contact-modal' onClick={() => setOpen(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  basicInfo,
  setBasicInfo,
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setBasicInfo({
      ...basicInfo,
      [name]: value
    });
  };
  const handleReceptionDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, receptionDate: date });
  };

  const handleEffectiveDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, effectiveDate: date });
  };

  const handleExpirationDateChange = (date: Date) => {
    setBasicInfo({ ...basicInfo, expirationDate: date });
  };

  return (
    <>
      <div className='title'>Basic info</div>
      <div className='form-wrapper'>
        <div className='form-col'>
          <div className='title'>Insured</div>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              name="insured"
              label='insured'
              value={basicInfo.insured}
              onChange={handleInputChange}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Country</InputLabel>

            <Select
              name="country"
              label='Country'
              value={basicInfo.country}
              onChange={handleSelectChange}
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

        <div className='form-col'>
          <div className='title'>Broker</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Broker</InputLabel>

            <Select
              name="broker"
              label='Select Broker'
              value={basicInfo.broker}
              onChange={handleSelectChange}
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
              name="brokerContact"
              label='Select Broker Contact'
              value={basicInfo.brokerContact}
              onChange={handleSelectChange}
              labelId='broker-contact'
            >
              <MenuItem value='brc1'>Broker contact 1</MenuItem>
              <MenuItem value='brc2'>Broker contact 2</MenuItem>
            </Select>
          </FormControl>
          <ModalContact id='modal-broker' />
        </div>
        <div className='form-col'>
          <div className='title'>Cedant</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Cedant</InputLabel>

            <Select
              name="cedant"
              label='Select Cedant'
              value={basicInfo.cedant}
              onChange={handleSelectChange}
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
              name="cedantContact"
              label='Select Cedant Contact'
              value={basicInfo.cedantContact}
              onChange={handleSelectChange}
              labelId='cedant-contact'
            >
              <MenuItem value='cedantc1'>Cedant contact 1</MenuItem>
              <MenuItem value='cedantc2'>Cedant contact 2</MenuItem>
            </Select>
          </FormControl>
          <ModalContact id='modal-broker' />
        </div>
        <div className='form-col'>
          <div className='title'>Business</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Line of business</InputLabel>

            <Select
              name="lineOfBusiness"
              label='Line of Business'
              value={basicInfo.lineOfBusiness}
              onChange={handleSelectChange}
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
        <div className='form-col'>
          <div className='title'>Dates</div>
          <DatePickerWrapper>
            <DatePicker
              selected={basicInfo.receptionDate}
              shouldCloseOnSelect
              id='reception-date'
              customInput={<CustomInput label='Reception date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              onChange={handleReceptionDateChange}
            />

            <DatePicker
              selected={basicInfo.effectiveDate}
              shouldCloseOnSelect
              id='effective-date'
              customInput={<CustomInput label='Effective date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              onChange={handleEffectiveDateChange}
            />
            <DatePicker
              selected={basicInfo.expirationDate}
              shouldCloseOnSelect
              id='expiration-date'
              customInput={<CustomInput label='Expiration date' sx={{ mb: 2, mt: 2, width: '100%' }} />}
              onChange={handleExpirationDateChange}
            />
          </DatePickerWrapper>
        </div>
        <div className='form-col'>
          <div className='title'>Underwriter team</div>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Underwriter</InputLabel>

            <Select
              name="underwriter"
              label='Underwriter'
              value={basicInfo.underwriter}
              onChange={handleSelectChange}
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
              name="leadUnderwriter"
              label='Lead Underwriter'
              value={basicInfo.leadUnderwriter}
              onChange={handleSelectChange}
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
              name="technicalAssistant"
              label='Technical assistant'
              value={basicInfo.technicalAssistant}
              onChange={handleSelectChange}
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

const PlacementStructure: React.FC<PlacementStructureProps> = ({
  placementStructure,
  setPlacementStructure,
  makeValidations,
  resetMakeValidations
}) => {
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
        const result = (reinsuranceBrokeragec * 100) / grossPremiumc
        console.log('resulttt')
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
        const result = (frontingFeec * 100) / grossPremiumc
        setFrontingFeeP(isFinite(result) ? result : 0)
        break
      }
      case 'grossPremium': {
        const resultBrokerage = (reinsuranceBrokeragec * 100) / grossPremiumc
        const resultTaxes = (taxesPc * 100) / grossPremiumc
        const resultFronting = (frontingFeec * 100) / grossPremiumc
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
    setPlacementStructure({
      ...placementStructure,
      reinsuranceBrokerageP: reinsuranceBrokerageP,
      reinsuranceBrokerage: reinsuranceBrokerage,
      taxes: taxes,
      taxesP: taxesP,
      frontingFeeP: frontingFeeP,
      frontingFee: frontingFee,
      grossPremium: grossPremium,
      netPremium: netPremium
    });
  }

  const handleCurrencyChange = (e: SelectChangeEvent<string>, child: ReactNode) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    switch (value) {
      case 'USD':
        setExchangeRate(18.5)
        setPlacementStructure({ ...placementStructure, currency: value, exchangeRate: 18.5 });
        break
      case 'EUR':
        setExchangeRate(20.0)
        setPlacementStructure({ ...placementStructure, currency: value, exchangeRate: 20.0 });
        break
      case 'MXN':
        setExchangeRate(1)
        setPlacementStructure({ ...placementStructure, currency: value, exchangeRate: 1 });
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = e.target;
    setPlacementStructure({ ...placementStructure, [name]: valueAsNumber });
  };

  const handleNumericInputChange = (value: any, e: any, ) => {
     const { name } = e.event.target;
     setPlacementStructure({ ...placementStructure, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>, child: ReactNode) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setPlacementStructure({
      ...placementStructure,
      [name]: value
    });
  };

  useEffect(() => {
    if (makeValidations) {
      console.log('La acción se realizó');
      resetMakeValidations();
    }
  }, [makeValidations]);

  return (
    <>
      <div className='title'>Placement Structure</div>
      <div className='form-wrapper'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              id='currency'
              label='Currency'
              value={placementStructure.currency}
              onChange={handleCurrencyChange}
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
              name="total"
              value={placementStructure.total}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='filled-multiline-flexible'
              label='Total values'
              multiline
              prefix={'$'}
              decimalScale={2}
              variant='outlined'
              onValueChange={(value, e) => {
                setTotal(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="sir"
              value={placementStructure.sir}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='sir'
              label='SIR'
              multiline
              prefix={'$'}
              decimalScale={2}
              variant='outlined'
              onValueChange={(value, e) => {
                setSir(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="reinsuranceBrokerageP"
              value={reinsuranceBrokerageP}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='reinsurance-brokerage'
              label='Reinsurance brokerage %'
              multiline
              prefix={'%'}
              decimalScale={2}
              variant='outlined'
              onBlur={() => calculate('reinsuranceBrokerageP')}
              onValueChange={(value, e) => {
                setReinsuranceBrokerageP(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="taxesP"
              value={taxesP}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='taxes-p'
              label='Taxes %'
              multiline
              prefix={'%'}
              decimalScale={2}
              variant='outlined'
              onBlur={() => calculate('taxesP')}
              onValueChange={(value, e) => {
                setTaxesP(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="frontingFeeP"
              value={frontingFeeP}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='fronting-fee-p'
              label='Fronting fee %'
              multiline
              prefix={'%'}
              maxRows={4}
              decimalScale={2}
              variant='outlined'
              onBlur={() => calculate('frontingFeeP')}
              onValueChange={(value, e) => {
                setFrontingFeeP(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="netPremium"
              value={netPremium}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              disabled
              id='net-premium'
              label='Net premium'
              multiline
              variant='outlined'
              decimalScale={2}
              onValueChange={(value, e) => {
                setNetPremium(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="exchangeRate"
              value={placementStructure.exchangeRate}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='exchange-rate'
              label='Exchange rate'
              multiline
              variant='outlined'
              decimalScale={2}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="limit"
              value={placementStructure.limit}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='limit'
              label='Limit'
              multiline
              variant='outlined'
              decimalScale={2}
              onValueChange={(value, e) => {
                setLimit(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="grossPremium"
              value={grossPremium}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='gross-premium'
              label='Gross Premium'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('grossPremium')}
              onValueChange={(value, e) => {
                setGrossPremium(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="reinsuranceBrokerage"
              value={reinsuranceBrokerage}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='reinsurance-brokerage'
              label='Reinsurance Brokerage'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('reinsuranceBrokerage')}
              onValueChange={(value, e) => {
                setReinsuranceBrokerage(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="taxes"
              value={taxes}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='taxes'
              label='Taxes'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('taxes')}
              onValueChange={(value, e) => {
                setTaxes(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="frontingFee"
              value={frontingFee}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='fornting-fee'
              label='Fronting fee'
              multiline
              variant='outlined'
              decimalScale={2}
              onBlur={() => calculate('frontingFee')}
              onValueChange={(value, e) => {
                setFrontingFee(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              name="attachmentPoint"
              value={placementStructure.attachmentPoint}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='attachment-point'
              label='Attachment point'
              multiline
              variant='outlined'
              decimalScale={2}
              onValueChange={(value, e) => {
                setAttachmentPoint(value.floatValue)
                handleNumericInputChange(value.floatValue, e)
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Type of limit</InputLabel>
            <Select
              name="typeOfLimit"
              label='Type of Limit'
              value={placementStructure.typeOfLimit}
              onChange={handleSelectChange}
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

const FileSubmit: React.FC<UserFileProps> = ({
  userFile,
  setUserFile,
}) => {

  // ** State
  const inputRef = useRef(null);
  const [file, setFile] = useState<File[]>([])
  const [errorFile, setErrorFile] = useState(false);
  const [showFile, setShowFile] = useState(false);


  const setFilevalues = (uploadFiles: File[]) => {
    setFile(uploadFiles);
    setErrorFile(false)
    setShowFile(true)

  }
  // triggers when file is selected with click
  const onFileChange = function (e: any) {
    e.preventDefault();
    setFilevalues(e.target.files[0])
    setUserFile({file: e.target.files[0]});
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };


  const handleRemoveFile = (e: any) => {
    e.preventDefault();
    // const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setUserFile({file: null});
    setShowFile(false)
  }

  useEffect(
    () => {
      // console.log(userFile?.length)
    }, [userFile])
  return (
    <Fragment>
      <div className="upload-btn">
        <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
          <input ref={inputRef} type="file" className='input-file-upload' id="input-file-upload" accept="image/*" onChange={onFileChange} />
          <label id="label-file-upload" htmlFor="input-file-upload">
            {showFile
              ? <div className='file-details'>
                <Icon icon='mdi:file-document-outline' />
                <Typography className='file-name'>{file?.name}</Typography>
                <IconButton
                  onClick={(e) => handleRemoveFile(e)}>
                  <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
              </div>
              : <Button
                className="upload-button"
                onClick={onButtonClick}
                variant='outlined'>
                <div className="btn-icon">
                  <Icon icon='mdi:upload' />
                </div>
                UPLOAD DOCUMENT
              </Button>

            }
          </label>
        </form>
      </div>

    </Fragment>
  )

}

const Information: React.FC = () => {

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [makeValidations, setMakeValidations] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
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
    receptionDate: new Date(),
    effectiveDate: new Date(),
    expirationDate: new Date(),
  });

  const [placementStructure, setPlacementStructure] = useState({
    currency: '',
    total: 0.00,
    sir: 0.00,
    reinsuranceBrokerageP: 0.00,
    taxesP: 0.00,
    frontingFeeP: 0.00,
    netPremium: 0.00,
    exchangeRate: 0.00,
    limit: 0.00,
    grossPremium: 0.00,
    reinsuranceBrokerage: 0.00,
    taxes: 0.00,
    frontingFee: 0.00,
    attachmentPoint: 0.00,
    typeOfLimit: '',
  });
  const [userFile, setUserFile] = useState({
    file: null,
  });


  const handleSubmit = () => {
    setMakeValidations(true)
    console.log(basicInfo, placementStructure, userFile)
  }

  const resetMakeValidations=()=>{
    setMakeValidations(false)
  }

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className='section'>
            <BasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
          </div>

          <div className='section'>
            <PlacementStructure
            placementStructure={placementStructure}
            setPlacementStructure={setPlacementStructure}
            makeValidations={makeValidations}
            resetMakeValidations={resetMakeValidations} />
          </div>

          <div className="section">
            <div className="title">File submit</div>
            <FileSubmit userFile={userFile} setUserFile={setUserFile} />
          </div>
          <div className="section">
            <Button
              className="upload-button"
              onClick={handleSubmit}
            >
              <div className="btn-icon">
                <Icon icon='mdi:content-save' />
              </div>
              SAVE CHANGES
            </Button>
          </div>

        </form>
      </div>
    </>
  )
}

export default Information
