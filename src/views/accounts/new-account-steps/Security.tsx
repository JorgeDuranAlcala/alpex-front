import { ForwardedRef, Fragment, forwardRef, useEffect, useRef, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { SxProps, Theme } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Components

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

// ** Types

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SwitchAlpex from 'src/pages/components/custom/switchs'

interface PickerProps {
  label?: string
  sx?: SxProps<Theme>
}
interface FormInfo extends PreviousFormInfo {
  NetPremium: string
  SharePercent: string
  DynamicComissionPercent: string
  FrontingFee: string
  ReinsuranceCompany: string
  PremiumPerShare: string
  DynamicComission: string
  FrontingFeePercent: string
  NetInsurancePremium: string
  RetroCedant: string
  RetroCedantContact: string
}

interface PreviousFormInfo {
  RecievedNetPremium?: string
  DistribuitedNetPremium?: string
  Diference?: string
}

const SecurityForm: FormInfo = {
  NetPremium: '',
  SharePercent: '',
  DynamicComissionPercent: '',
  FrontingFee: '',
  ReinsuranceCompany: '',
  PremiumPerShare: '',
  DynamicComission: '',
  FrontingFeePercent: '',
  NetInsurancePremium: '',
  RetroCedant: '',
  RetroCedantContact: '',
  RecievedNetPremium: '',
  DistribuitedNetPremium: '',
  Diference: ''
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
  country: ''
}

interface IModal {
  id: string
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

const FormSection = () => {
  const [formData, setFormData] = useState<FormInfo>(SecurityForm)
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(true)

  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    setFormData({ ...formData, [field]: value })
  }

  useEffect(() => {
    setFormData({ ...formData, RetroCedantContact: '' })
  }, [formData.RetroCedant])

  return (
    <>
      <div className='title'>Security</div>
      <span className='switch-text'>Fronting fee </span>
      <SwitchAlpex
        onClick={() => {
          setFrontingFeeEnabled(!frontingFeeEnabled)
        }}
      />
      <div className='form-wrapper space-top'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Net premium at 100%'
              value={formData.NetPremium}
              onChange={e => handleFormChange('NetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Share %'
              value={formData.SharePercent}
              onChange={e => handleFormChange('SharePercent', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission %'
              value={formData.DynamicComissionPercent}
              onChange={e => handleFormChange('DynamicComissionPercent', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee %'
                value={formData.FrontingFeePercent}
                onChange={e => handleFormChange('FrontingFeePercent', e.target.value)}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          )}
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Reinsurance companies</InputLabel>

            <Select
              label='Select a reinsurance company'
              value={formData.ReinsuranceCompany}
              onChange={e => handleFormChange('ReinsuranceCompany', e.target.value)}
              labelId='broker'
            >
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select a reinsurance company
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Premium per share'
              value={formData.PremiumPerShare}
              onChange={e => handleFormChange('PremiumPerShare', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission'
              value={formData.DynamicComission}
              onChange={e => handleFormChange('DynamicComission', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee'
                value={formData.FrontingFee}
                onChange={e => handleFormChange('FrontingFee', e.target.value)}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          )}
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Net reinsurance premium'
              value={formData.NetInsurancePremium}
              onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Retro cedant</InputLabel>

            <Select
              label='Select Retro cedant'
              value={formData.RetroCedant}
              onChange={e => {
                handleFormChange('RetroCedant', e.target.value)
              }}
              labelId='broker'
            >
              <MenuItem value=''>Select Retro cedant</MenuItem>
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select Retro cedant
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Retro Cedant contact</InputLabel>

            <Select
              label='Select Retro Cedant contact'
              value={formData.RetroCedantContact}
              onChange={e => handleFormChange('RetroCedantContact', e.target.value)}
              labelId='broker'
              disabled={formData.RetroCedant === ''}
            >
              <MenuItem value=''>Select Retro Cedant contact</MenuItem>
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select a Retro Cedant contact
              </FormHelperText>
            )}
          </FormControl>
          {formData.RetroCedantContact !== '' && (
            <>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact phone'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact country'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
            </>
          )}
        </div>
        <div className='fullwidth'>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Recieved net premium'
              disabled
              fullWidth
              value={formData.RecievedNetPremium}
              onChange={e => handleFormChange('RecievedNetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Distribuited net premium'
              disabled
              value={formData.DistribuitedNetPremium}
              onChange={e => handleFormChange('DistribuitedNetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Diference'
              disabled
              value={formData.Diference}
              onChange={e => handleFormChange('Diference', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
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
  }

  const handleCurrencyChange = (value: any) => {
    console.log(value)
    switch (value) {
      case 'USD':
        setExchangeRate(18.5)
        break
      case 'EUR':
        setExchangeRate(20.0)
        break
      case 'MXN':
        setExchangeRate(1)
        break
    }
  }

  return (
    <>
      <div className='title'>Placement Structure</div>
      <div className='form-wrapper'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              id='currency'
              label='Currency'
              value={currency}
              onChange={e => {
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={sir}
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={exchangeRate}
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
              value={limit}
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
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
              }}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={attachmentPoint}
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
              }}
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

const FileSubmit = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef(null)
  const [userFile, setUserFile] = useState<File[]>([])
  const [errorFile, setErrorFile] = useState(false)
  const [showFile, setShowFile] = useState(false)

  const setFilevalues = (uploadFiles: File[]) => {
    console.log(uploadFiles?.length)
    setUserFile(uploadFiles)
    console.log(userFile)
    setErrorFile(false)
    setShowFile(true)
  }
  // triggers when file is selected with click
  const onFileChange = function (e) {
    e.preventDefault()
    setFilevalues(e.target.files[0])
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  const handleRemoveFile = e => {
    e.preventDefault()
    // const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setUserFile([])
    setShowFile(false)
  }

  useEffect(() => {
    // console.log(userFile?.length)
  }, [userFile])
  return (
    <Fragment>
      <div className='upload-btn'>
        <form id='form-file-upload' onSubmit={e => e.preventDefault()}>
          <input
            ref={inputRef}
            type='file'
            className='input-file-upload'
            id='input-file-upload'
            accept='image/*'
            onChange={onFileChange}
          />
          <label id='label-file-upload' htmlFor='input-file-upload'>
            {showFile ? (
              <div className='file-details'>
                <Icon icon='mdi:file-document-outline' />
                <Typography className='file-name'>{userFile?.name}</Typography>
                <IconButton onClick={e => handleRemoveFile(e)}>
                  <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
              </div>
            ) : (
              <Button className='upload-button' onClick={onButtonClick} variant='outlined'>
                <div className='btn-icon'>
                  <Icon icon='mdi:upload' />
                </div>
                UPLOAD DOCUMENT
              </Button>
            )}
          </label>
        </form>
      </div>
    </Fragment>
  )
}

const Security = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter

  const handleSubmit = () => {
    console.log('elsubmit')
  }
  const {
    control,
    formState: { errors }
  } = useForm()

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className='section'>
            <FormSection />
          </div>

          <div className='section'>
            <PlacementStructure />
          </div>

          <div className='section'>
            <div className='title'>File submit</div>
            <FileSubmit />
          </div>
        </form>
      </div>
    </>
  )
}

export default Security
