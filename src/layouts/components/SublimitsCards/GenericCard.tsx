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
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import Icon from 'src/@core/components/icon'
import { ContainerCard, ContentCard, HeaderCard, InputForm, SubContainer } from 'src/styles/Forms/Sublimits'
import { RenderFormGeneric } from '../CardSublimit'

interface FormErrors {
  minimunPriceError: boolean
  coinsuranceError: boolean
  daysError: boolean
  priceInterruptionError: boolean
}

export type FormGenericCard = {
  sublimit: number
  percentage: number
  price: number
  minimunPrice: number
  days: number
  priceInterruption: number
  coinsurance: number
}

const initialData: FormGenericCard = {
  sublimit: 0,
  percentage: 0,
  price: 0,
  minimunPrice: 0,
  days: 0,
  priceInterruption: 0,
  coinsurance: 0
}

const GenericCard: React.FC<RenderFormGeneric> = ({ title, deleteForm }: RenderFormGeneric) => {
  console.log(title)
  const [dataForm, setDataForm] = useState<FormGenericCard>(initialData)
  const [selectedValueRadio, setSelectedValueRadio] = useState<string>('')
  const [errors] = useState<FormErrors>({
    minimunPriceError: false,
    coinsuranceError: false,
    daysError: false,
    priceInterruptionError: false
  })
  const handleNumericInputChange = (value: any, e: any) => {
    const { name } = e.event.target
    setDataForm({ ...dataForm, [name]: value })
  }
  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValueRadio(event.target.value)
    console.log(event.target.value)
  }

  const [option, setOption] = useState('')
  const options = [
    { name: 'Select option', value: '' },
    { name: 'Option1', value: 1 },
    { name: 'Option2', value: 2 },
    { name: 'Option3', value: 3 },
    { name: 'Option4', value: 4 },
    { name: 'Option5', value: 5 }
  ]
  const handleOnchange = (e: SelectChangeEvent) => {
    setOption(e.target.value)
  }

  // const getErrorMessage = (name: keyof FormErrors) => {
  //   return errors[name] ? 'This field is required' : ''
  // }

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle

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
              variant='outlined'
              onValueChange={(value, e) => {
                handleNumericInputChange(value.floatValue, e)
              }}
            />
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '8px', width: '88px' }}>
            <Checkbox
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
              defaultValue='female'
              name='radio-buttons-group'
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
              defaultValue='female'
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
                control={<Radio sx={{ mr: 2 }} value='none' onChange={handleChangeRadio} />}
                label='None'
              />
              <InputForm>
                <FormControlLabel
                  sx={{ ml: 0.3 }}
                  control={<Radio sx={{ mr: -1 }} value={'price'} onChange={handleChangeRadio} />}
                  label=''
                />
                <NumericFormat
                  placeholder='0%'
                  name='percentage'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'%'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={(value, e) => {
                    handleNumericInputChange(value.floatValue, e)
                  }}
                />
              </InputForm>
              {selectedValueRadio === 'price' ? (
                <>
                  <FormControl fullWidth>
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
                      variant='outlined'
                      onValueChange={(value, e) => {
                        handleNumericInputChange(value.floatValue, e)
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Aplicable over</InputLabel>
                    <Select
                      sx={{ height: '56px' }}
                      label='Aplicable over'
                      labelId='controlled-select-label'
                      value={option}
                      onChange={e => {
                        handleOnchange(e)
                      }}
                      IconComponent={KeyboardArrowDownIcon}
                    >
                      {options?.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : null}
              <InputForm>
                <FormControlLabel
                  sx={{ ml: 0.3 }}
                  value='percentage'
                  control={<Radio sx={{ mr: -1 }} value='percentage' onChange={handleChangeRadio} />}
                  label=''
                />
                <NumericFormat
                  placeholder='$0.00'
                  name='price'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={(value, e) => {
                    handleNumericInputChange(value.floatValue, e)
                  }}
                />
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
              defaultValue='female'
              name='radio-buttons-group'
              sx={{ height: '100%', gap: '10px', mt: 1 }}
            >
              <InputForm>
                <FormControlLabel sx={{ ml: 0.3 }} value='price' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  placeholder='0 days'
                  name='days'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  decimalScale={2}
                  error={errors.daysError}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={(value, e) => {
                    handleNumericInputChange(value.floatValue, e)
                  }}
                />
                {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
              </InputForm>

              <InputForm>
                <FormControlLabel sx={{ ml: 0.3 }} value='percentage' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  placeholder='$0.00'
                  name='priceInterruption'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={(value, e) => {
                    handleNumericInputChange(value.floatValue, e)
                  }}
                />
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
            prefix={'%'}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={(value, e) => {
              handleNumericInputChange(value.floatValue, e)
            }}
          />
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
