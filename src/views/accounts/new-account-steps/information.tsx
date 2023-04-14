import { ForwardedRef, forwardRef, useState } from 'react'

// ** MUI Imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from "@mui/material/InputLabel"
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Components

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'


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
  conuntry: '',
  broker: '',
  brokerContact: '',
  cedant: '',
  cedantContact: '',
  lineOfBusiness: '',
  underwriter: '',
  leadUnderwriter: '',
  technicalAssistant: '',
}

interface PlacementData {
  currency: string
  total: number
  sir: number
  reinsuranceBrokerageP: number
  taxesP: number
  frontingFeeP: number
  netPremium: number
  exchangeRate: number
  limit: number
  grossPremium: number
  reinsuranceBrokerage: number
  taxes: number
  frontingFee: number
  attachmentPoint: number
  typeOfLimit: number
}

const initialPlacementData: PlacementData = {
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
  typeOfLimit: 0.00,
}

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

const ModalBroker = () => {

  return (
  <>

  <div className="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalCenterTitle">Modal title</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col mb-4 mt-2">
              <div className="form-floating form-floating-outline">
                <input type="text" id="nameWithTitle" className="form-control" placeholder="Enter Name"/>
                <label >Name</label>
              </div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col mb-2">
              <div className="form-floating form-floating-outline">
                <input type="email" id="emailWithTitle" className="form-control" placeholder="xxxx@xxx.xx"/>
                <label>Email</label>
              </div>
            </div>
            <div className="col mb-2">
              <div className="form-floating form-floating-outline">
                <input type="date" id="dobWithTitle" className="form-control" placeholder="DD / MM / YY"/>
                <label >DOB</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
</div>
  </>
  )
}

const BasicInfo = () => {

  const { control, setValue, formState: { errors } } = useForm();
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

            {errors.country && (
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
            {errors.broker && (
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
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCenter">
    Launch modal
  </button>
  <ModalBroker/>
          <Button className="create-contact-btn">
            <div className="btn-icon">
              <Icon icon='mdi:plus-circle-outline' />
            </div>
            CREATE NEW CONTACT
          </Button>
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

            {errors.cedant && (
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
          <Button className="create-contact-btn">
            <div className="btn-icon">
              <Icon icon='mdi:plus-circle-outline' />
            </div>

            CREATE NEW CONTACT
          </Button>
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
            {errors.business && (
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
  const [cur, setReceptionDate] = useState()

  const [formData, setFormData] = useState<PlacementData>(initialPlacementData)

  const changeInput = () => {
    console.log("input")
  }
  type AutoCalculate =
  'reinsuranceBrokerage' | 'reinsuranceBrokerageP' | 'taxes' | 'taxesP' | 'frontingFee' | 'frontingFeeP' | 'grossPremium'

  const calculate = async (type : keyof PlacementData) => {
    console.log(type)
    const grossPremium:number = formData.grossPremium || 0
    const reinsuranceBrokerageP:number = formData.reinsuranceBrokerageP || 0
    const reinsuranceBrokerage:number = formData.reinsuranceBrokerage || 0
    const taxesP:number = formData.taxesP || 0
    const taxes:number = formData.taxes || 0
    const frontingFeeP:number = formData.frontingFeeP || 0
    const frontingFee:number = formData.frontingFee || 0

    switch (type) {
      case 'reinsuranceBrokerage':{
        console.log(grossPremium)
        console.log(reinsuranceBrokerageP)
        const result = grossPremium * (reinsuranceBrokerageP / 100)


        break
      }
      case 'reinsuranceBrokerageP':{
        const result = reinsuranceBrokerage * 100 / grossPremium
        setFormData({ ...formData, [type]: (isFinite(result) ? result : 0) })
        break
      }
      case 'taxesP':{
        const result = (taxes * 100) / grossPremium
        setFormData({ ...formData, ["taxesP"]: (isFinite(result) ? result : 0) })
        break
      }
      case 'taxes':{
        const result = grossPremium * (taxesP / 100)
        setFormData({ ...formData, ["taxes"]: (isFinite(result) ? result : 0) })
        break
      }
      case 'frontingFee':{
        const result = grossPremium * (frontingFeeP / 100)
        setFormData({ ...formData, ["frontingFee"]: (isFinite(result) ? result : 0) })
        break
      }
      case 'frontingFeeP':{
        const result = frontingFee * 100 / grossPremium
        setFormData({ ...formData, ["frontingFeeP"]: (isFinite(result) ? result : 0) })
        break
      }
      case 'grossPremium':{
        const resultBrokerage = reinsuranceBrokerage * 100 / grossPremium
        const resultTaxes = taxesP * 100 / grossPremium
        const resultFronting = frontingFee * 100 / grossPremium
        setFormData({ ...formData, ["reinsuranceBrokerageP"]: (isFinite(resultBrokerage) ? resultBrokerage : 0) })
        setFormData({ ...formData, ["taxesP"]: (isFinite(resultTaxes) ? resultTaxes : 0) })
        setFormData({ ...formData, ["frontingFeeP"]: (isFinite(resultFronting) ? resultFronting : 0) })
        break
      }
    }
    const reinsuranceBrokerageTotalFinal = formData.reinsuranceBrokerage ? formData.reinsuranceBrokerage : 0
    const taxesFinal = formData.taxes ? formData.taxes : 0
    const frontingFeeTotalFinal = formData.frontingFee ? formData.frontingFee : 0
    setFormData({ ...formData, ["netPremium"]: (grossPremium - reinsuranceBrokerageTotalFinal - taxesFinal - frontingFeeTotalFinal) })
    setFormData({ ...formData, ["total"]: 456 })

  }

  const handleFormChange = (field: keyof PlacementData, value: any) => {
    console.log(value)
    setFormData({ ...formData, [field]: value })
    console.log(formData)
  }
  return (
    <>
      <div className="title">Placement Structure</div>
      <div className="form-wrapper">
        <div className="form-col">
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              label='Currency'
              value={formData.currency}
              onChange={e => handleFormChange('currency', e.target.value)}
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
              value={formData.total}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="filled-multiline-flexible"
              label="Total values"
              multiline
              prefix={'$'}
              maxRows={4}
              variant="outlined"
              onValueChange={(value, e) => {handleFormChange('total', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.sir}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="sir"
              label="SIR"
              multiline
              prefix={'$'}
              maxRows={4}
              variant="outlined"
              onValueChange={(value, e) => {handleFormChange('sir', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.reinsuranceBrokerageP}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="reinsurance-brokerage"
              label="Reinsurance brokerage %"
              multiline
              prefix={'%'}
              maxRows={4}
              variant="outlined"
              onBlur={()=> calculate('reinsuranceBrokerage')}
              onValueChange={(value, e) => {handleFormChange('reinsuranceBrokerageP', value.floatValue)}}

            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.taxesP}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="taxes-p"
              label="Taxes %"
              multiline
              prefix={'%'}
              variant="outlined"
              onBlur={()=> calculate('taxesP')}
              onValueChange={(value, e) => {handleFormChange('taxesP', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>

            <NumericFormat
              value={formData.frontingFeeP}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="fronting-fee-p"
              label="Fronting fee %"
              multiline
              prefix={'%'}
              maxRows={4}
              variant="outlined"
              onBlur={()=> calculate('frontingFeeP')}
              onValueChange={(value, e) => {handleFormChange('frontingFeeP', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.netPremium}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              disabled
              id="net-premium"
              label="Net premium"
              multiline
              variant="outlined"
              onValueChange={(value, e) => {handleFormChange('netPremium', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

        </div>

        <div className="form-col">
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.exchangeRate}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="exchange-rate"
              label="Exchange rate"
              disabled
              multiline
              variant="outlined"

            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.limit}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="limit"
              label="Limit"
              multiline
              variant="outlined"
              onValueChange={(value, e) => {handleFormChange('limit', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.grossPremium}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="gross-premium"
              label="Gross Premium"
              multiline
              variant="outlined"
              onBlur={()=> calculate('grossPremium')}
              onValueChange={(value, e) => {handleFormChange('grossPremium', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.reinsuranceBrokerage}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="reinsurance-brokerage"
              label="Reinsurance Brokerage"
              multiline
              variant="outlined"
              onBlur={()=> calculate('reinsuranceBrokerage')}
              onValueChange={(value, e) => {handleFormChange('reinsuranceBrokerage', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.taxes}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="taxes"
              label="Taxes"
              multiline
              variant="outlined"
              onBlur={()=> calculate('taxes')}
              onValueChange={(value, e) => {handleFormChange('taxes', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.frontingFee}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="fornting-fee"
              label="Fronting fee"
              multiline
              variant="outlined"
              onBlur={()=> calculate('frontingFee')}
              onValueChange={(value, e) => {handleFormChange('frontingFee', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
        </div>
        <div className="form-col">
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <NumericFormat
              value={formData.attachmentPoint}
              allowLeadingZeros
              thousandSeparator=","
              customInput={TextField}
              id="attachment-point"
              label="Attachment point"
              multiline
              variant="outlined"
              onValueChange={(value, e) => {handleFormChange('attachmentPoint', value.floatValue)}}
            />
            {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Type of limit</InputLabel>
            <Select
              label='Type of Limit'
              value={formData.typeOfLimit}
              onChange={e => handleFormChange('typeOfLimit', e.target.value)}
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

