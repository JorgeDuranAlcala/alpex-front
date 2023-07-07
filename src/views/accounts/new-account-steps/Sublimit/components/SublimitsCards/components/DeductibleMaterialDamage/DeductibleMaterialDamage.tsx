import UserThemeOptions from '@/layouts/UserThemeOptions'
import { InputForm, SubContainer } from '@/styles/Forms/Sublimits'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { NumericFormat } from 'react-number-format'

export type DeductibleMaterialDamageProps = {
  onClickRadioDeductible: (deductibleDamage: string) => void
}

const DeductibleMaterialDamage: React.FC<DeductibleMaterialDamageProps> = ({ onClickRadioDeductible }) => {
  const [radioDeductbleDamage, setRadioDeductbleDamage] = useState<string>('')

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle
  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    onClickRadioDeductible(event.target.value)
    setRadioDeductbleDamage(event.target.value)
  }
  const options = [
    { name: 'Loss', id: 1 },
    { name: "TIV's", id: 2 },
    { name: 'Affected item', id: 3 }
  ]

  return (
    <SubContainer sx={{ height: 'auto' }}>
      <Typography variant='body1' sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}>
        Deductible material damage
      </Typography>
      <RadioGroup
        value={radioDeductbleDamage}
        aria-labelledby='material-radio-buttons-group-label'
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
            control={
              <Radio
                sx={{ mr: -1 }}
                value={'per'}
                onChange={() => {
                  console.log('radio')
                }}
              />
            }
            label=''
          />
          <NumericFormat
            placeholder='0%'
            name='per'
            disabled={false}
            allowLeadingZeros
            value={''}
            thousandSeparator=','
            customInput={Input}
            suffix={'%'}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            isAllowed={values => {
              const { floatValue } = values

              return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
            }}
            onValueChange={value => {
              console.log(value)

              // onChangeItem(value.floatValue, 'deductible')
            }}
          />
        </InputForm>
        <FormHelperText sx={{ color: 'error.main', marginTop: '-3px' }}></FormHelperText>

        <FormControl fullWidth>
          <NumericFormat
            name='min'
            value={''}
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
              console.log(value)

              // onChangeItem(value.floatValue, 'min')
            }}
            isAllowed={values => {
              const { floatValue } = values

              return floatValue! >= 0 || floatValue === undefined
            }}
          />
          <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='controlled-select-label'>Aplicable over</InputLabel>
          <Select
            sx={{ height: '56px' }}
            label='Aplicable over'
            labelId='controlled-select-label'
            value={''}
            onChange={() => {
              // onChangeItem(e.target.value, 'idCDeductiblePer')
            }}
            IconComponent={KeyboardArrowDownIcon}
          >
            {options.length > 0 &&
              options?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
        </FormControl>

        <InputForm>
          <FormControlLabel
            sx={{ ml: 0.3 }}
            value='amount'
            control={
              <Radio
                sx={{ mr: -1 }}
                value='amount'
                onChange={() => {
                  // handleChangeRadio
                }}
              />
            }
            label=''
          />
          <NumericFormat
            placeholder='$0.00'
            name='amount'
            allowLeadingZeros
            value={''}
            disabled={false}
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
              console.log(value)

              // onChangeItem(value.floatValue, 'amount')
            }}
            isAllowed={values => {
              const { floatValue } = values

              return floatValue! >= 0 || floatValue === undefined
            }}
          />
        </InputForm>
        <FormHelperText sx={{ color: 'error.main', marginTop: '-3px' }}></FormHelperText>
      </RadioGroup>
    </SubContainer>
  )
}

export default DeductibleMaterialDamage
