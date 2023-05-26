import UserThemeOptions from '@/layouts/UserThemeOptions'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Icon from 'src/@core/components/icon'
import { ContainerCard, ContentCard, HeaderCard, InputForm, SubContainer } from 'src/styles/Forms/Sublimits'
import { RenderFormGeneric } from '../CardSublimit'

interface FormErrors {
  minError: boolean
  coinsuranceError: boolean
  daysError: boolean
  priceInterruptionError: boolean
}

export type FormGenericCard = {
  yes?: boolean
  luc?: boolean
  sublimit: number
  percentage: number
  price: number
  min: number
  days: number
  priceInterruption: number
  coinsurance: number
  index?: number
  typeDeductible?: string
  typeBi?: string
  at100?: boolean
  typeDeductibleRadio?: string
}

const initialData: FormGenericCard = {
  sublimit: 0,
  percentage: 0,
  price: 0,
  min: 0,
  days: 0,
  priceInterruption: 0,
  coinsurance: 0,
  yes: false,
  luc: false,
  typeDeductible: '',
  typeBi: 'BIDays',
  at100: false,
  typeDeductibleRadio: ''
}

const GenericCard: React.FC<RenderFormGeneric> = ({
  title,
  deleteForm,
  handleOnChangeForm,
  formInformation,
  index = 0,
  formErrors
}: RenderFormGeneric) => {
  const [dataForm, setDataForm] = useState<FormGenericCard>(initialData)
  const [selectedValueRadio, setSelectedValueRadio] = useState<string>('')
  const [, setErrorForm] = useState({})
  const [errors] = useState<FormErrors>({
    minError: false,
    coinsuranceError: false,
    daysError: false,
    priceInterruptionError: false
  })
  const [numericError, setNumericError] = useState<string>('')
  const [checked, setChecked] = useState(false)

  const handleNumericInputChange = (value: any, e: any) => {
    const { name } = e
    setDataForm({ ...dataForm, [name]: value })
  }

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValueRadio(event.target.value)
    setDataForm({
      ...dataForm,
      percentage: 0,
      price: 0,
      min: 0,
      typeDeductible: '',
      typeDeductibleRadio: event.target.value
    })
  }

  const handleChangeRadioBI = (value: string) => {
    setDataForm({ ...dataForm, days: 0, priceInterruption: 0, typeBi: value })
  }

  const handleChangeRadioYesLuc = (value: string) => {
    if (value !== 'yes' && value !== 'luc') {
      setDataForm({ ...dataForm, yes: false, luc: false })

      return
    }
    value === 'yes'
      ? setDataForm({ ...dataForm, yes: true, luc: false })
      : setDataForm({ ...dataForm, yes: false, luc: true })
  }

  const options = [
    { name: 'Select option', value: '' },
    { name: 'Loss', value: 'Loss' },
    { name: "TIV's", value: "TIV's" },
    { name: 'Affected item', value: 'Affected item' }
  ]

  // const getErrorMessage = (name: keyof FormErrors) => {
  //   return errors[name] ? 'This field is required' : ''
  // }

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle
  useEffect(() => {
    if (checked) {
      setDataForm({ ...dataForm, sublimit: +formInformation?.informations[0].limit })
    } else {
      setDataForm({ ...dataForm, sublimit: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])
  useEffect(() => {
    if (dataForm) handleOnChangeForm(dataForm, index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForm])
  useEffect(() => {
    setErrorForm(formErrors[index] || {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors])

  return (
    <ContainerCard>
      <HeaderCard sx={{ height: title === 'Business Interruption Machinery Breakdown' ? '68px' : '48px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alingItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: title === 'Business Interruption Machinery Breakdown' ? '52px' : '26px'

            // border: '1px solid white'
          }}
        >
          <Typography textTransform={'uppercase'} sx={{ color: '#FFF' }}>
            {title}
          </Typography>
          <IconButton onClick={deleteForm}>
            <Icon icon='mdi:delete-outline' fontSize={22} color='#FFF' />
          </IconButton>
        </Box>
      </HeaderCard>
      <ContentCard>
        <SubContainer sx={{ flexDirection: 'row', height: '56px' }}>
          <FormControl sx={{ width: '64%' }}>
            <NumericFormat
              name='sublimit'
              value={dataForm.sublimit}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='filled-multiline-flexible'
              label='Sublimit'
              multiline
              prefix={'$'}
              decimalScale={2}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = +formInformation?.informations[0].limit
                if ((floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined) {
                  setNumericError('')

                  return true
                }
                setNumericError(`Sublimit cannot be greater than limit`)

                return false
              }}
              variant='outlined'
              disabled={checked}
              onValueChange={value => {
                handleNumericInputChange(value.floatValue, { name: 'sublimit' })
              }}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{numericError}</FormHelperText>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '8px', width: '88px' }}>
            <Checkbox
              onChange={() => {
                setChecked(!checked)
              }}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                color: '#2535A8',
                '&.Mui-checked': {
                  color: '#2535A8'
                }
              }}
            />
            <Typography>100%</Typography>
          </Box>
        </SubContainer>
        {title === 'Terrorism' || title === 'Business interruption' ? (
          <SubContainer sx={{ height: 'auto' }}>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='yes'
              name='radio-buttons-group'
              onChange={(_, val) => handleChangeRadioYesLuc(val)}
              sx={{
                height: '100%',
                gap: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                pl: 6
              }}
            >
              <FormControlLabel value='yes' control={<Radio sx={{ mr: 2 }} />} label='Yes' />
              <FormControlLabel value='luc' control={<Radio sx={{ mr: 2 }} />} label='Luc' />
            </RadioGroup>
          </SubContainer>
        ) : null}
        {title !== 'Business interruption' ? (
          <SubContainer sx={{ height: 'auto' }}>
            <Typography
              variant='body1'
              sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}
            >
              Deductible material damage
            </Typography>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='none'
              name='radio-buttons-group'
              sx={{ height: '100%', gap: '10px' }}
            >
              <FormControlLabel
                sx={{
                  border: '1px solid rgba(87, 90, 111, 0.22)',
                  width: '100%',
                  ml: 0.3,
                  borderRadius: '8px',
                  height: '58px'
                }}
                value='none'
                control={<Radio sx={{ mr: 2 }} value='none' defaultChecked onChange={handleChangeRadio} />}
                label='None'
              />
              <InputForm>
                <FormControlLabel
                  sx={{ ml: 0.3 }}
                  control={<Radio sx={{ mr: -1 }} value={'percentage'} onChange={handleChangeRadio} />}
                  label=''
                />
                <NumericFormat
                  placeholder='0%'
                  name='percentage'
                  disabled={!(selectedValueRadio === 'percentage')}
                  allowLeadingZeros
                  value={dataForm.percentage}
                  thousandSeparator=','
                  customInput={Input}
                  suffix={'%'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={value => {
                    handleNumericInputChange(value.floatValue, { name: 'percentage' })
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.percentage}</FormHelperText>
              </InputForm>
              {selectedValueRadio === 'percentage' ? (
                <>
                  <FormControl fullWidth>
                    <NumericFormat
                      name='min'
                      value={dataForm.min}
                      allowLeadingZeros
                      thousandSeparator=','
                      customInput={TextField}
                      id='filled-multiline-flexible'
                      label='Minimum'
                      multiline
                      prefix={'$'}
                      decimalScale={2}
                      variant='outlined'
                      onValueChange={value => {
                        handleNumericInputChange(value.floatValue, { name: 'min' })
                      }}
                    />
                    <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.min}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Aplicable over</InputLabel>
                    <Select
                      sx={{ height: '56px' }}
                      label='Aplicable over'
                      labelId='controlled-select-label'
                      value={dataForm.typeDeductible}
                      onChange={e => {
                        handleNumericInputChange(e.target.value, { name: 'typeDeductible' })
                      }}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      {options?.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.typeDeductible}</FormHelperText>
                  </FormControl>
                </>
              ) : null}
              <InputForm>
                <FormControlLabel
                  sx={{ ml: 0.3 }}
                  value='price'
                  control={<Radio sx={{ mr: -1 }} value='price' onChange={handleChangeRadio} />}
                  label=''
                />
                <NumericFormat
                  placeholder='$0.00'
                  name='price'
                  allowLeadingZeros
                  value={dataForm.price}
                  disabled={!(selectedValueRadio === 'price')}
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={value => {
                    handleNumericInputChange(value.floatValue, { name: 'price' })
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.price}</FormHelperText>
              </InputForm>
            </RadioGroup>
          </SubContainer>
        ) : null}
        {title === 'Machinery breakdown' || title === 'AMIT & SRCC' || title === 'Electronic Equipment' ? (
          <SubContainer sx={{ height: 'auto' }}>
            <Typography
              variant='body1'
              sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}
            >
              Loss
            </Typography>
            <Select
              sx={{ width: '100%', height: '48px', outline: 'none' }}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
            ></Select>
          </SubContainer>
        ) : (
          <SubContainer sx={{ height: 'auto' }}>
            <Typography
              variant='body1'
              sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}
            >
              Business interruption
            </Typography>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='BIDays'
              name='radio-buttons-group'
              sx={{ height: '100%', gap: '10px', mt: 1 }}
              onChange={(_, val) => handleChangeRadioBI(val)}
            >
              <InputForm>
                <FormControlLabel sx={{ ml: 0.3 }} value='BIDays' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  placeholder='0 days'
                  name='days'
                  allowLeadingZeros
                  value={dataForm.days}
                  thousandSeparator=','
                  customInput={Input}
                  disabled={!(dataForm.typeBi === 'BIDays')}
                  decimalScale={2}
                  error={errors.daysError}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={value => {
                    handleNumericInputChange(value.floatValue, { name: 'days' })
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.days}</FormHelperText>

                {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
              </InputForm>

              <InputForm>
                <FormControlLabel sx={{ ml: 0.3 }} value='BIPrice' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  placeholder='$0.00'
                  name='priceInterruption'
                  value={dataForm.priceInterruption}
                  allowLeadingZeros
                  thousandSeparator=','
                  disabled={!(dataForm.typeBi === 'BIPrice')}
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={value => {
                    handleNumericInputChange(value.floatValue, { name: 'priceInterruption' })
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.priceInterruption}</FormHelperText>
              </InputForm>
            </RadioGroup>
          </SubContainer>
        )}
        <SubContainer sx={{ height: 'auto' }}>
          <Typography
            variant='body1'
            sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}
          >
            Coinsurance
          </Typography>

          <NumericFormat
            label='%'
            placeholder='0%'
            name='coinsurance'
            allowLeadingZeros
            thousandSeparator=','
            customInput={TextField}
            suffix={'%'}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={value => {
              handleNumericInputChange(value.floatValue, { name: 'coinsurance' })
            }}
          />
          <FormHelperText sx={{ color: 'error.main' }}>{formErrors[index]?.coinsurance}</FormHelperText>
        </SubContainer>
      </ContentCard>
    </ContainerCard>
  )
}

export default GenericCard

{
  /* <RadioGroup row sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}>
<FormControlLabel value='None' label='Default' control={<Radio />} />
</RadioGroup> */
}

{
  /* <Input
                  placeholder='0.00'
                  disabled={false}
                  sx={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid rgba(87, 90, 111, 0.22)',
                    '&:before, &:after': { display: 'none' }
                  }}
                  startAdornment={
                    <FormControlLabel sx={{ ml: 0.3 }} value='male' control={<Radio sx={{ mr: -1 }} />} label='' />
                  }
                /> */
}
