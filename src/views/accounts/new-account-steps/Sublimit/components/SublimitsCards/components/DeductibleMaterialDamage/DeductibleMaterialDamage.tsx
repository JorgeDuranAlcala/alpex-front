import UserThemeOptions from '@/layouts/UserThemeOptions'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
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
import React from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'
import { FormErrors } from '../../../../Sublimits'

export type DeductibleMaterialDamageProps = {
  onHandleChangeSubLimit: (deductibleDamage: SublimitDto) => void
  subLimit: SublimitDto
  errorCard: FormErrors
  showErrors: boolean
}

const DeductibleMaterialDamage: React.FC<DeductibleMaterialDamageProps> = ({
  subLimit,
  onHandleChangeSubLimit,
  errorCard,
  showErrors
}) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle
  const handleChangeItem = (event: any, name: string) => {
    const reset = {
      deductible: null,
      min: null,
      idCDeductiblePer: null,
      amount: null
    }
    const subLimitTemp = { ...subLimit, [name]: event.target.value }
    if (name === 'typeDeductible') {
      onHandleChangeSubLimit({ ...subLimitTemp, ...reset, [name]: event.target.value })
    } else {
      onHandleChangeSubLimit(subLimitTemp)
    }
  }

  //TODO: generar un servicio para que se obtenga esto de bd
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
        value={subLimit.typeDeductible}
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
          control={
            <Radio
              sx={{ mr: 2 }}
              value='none'
              defaultChecked
              onChange={e => {
                handleChangeItem(e, 'typeDeductible')
              }}
            />
          }
          label='None'
        />
        <InputForm>
          <FormControlLabel
            sx={{ ml: 0.3 }}
            control={
              <Radio
                sx={{ mr: -1 }}
                value={'per'}
                onChange={e => {
                  handleChangeItem(e, 'typeDeductible')
                }}
              />
            }
            label=''
          />
          <NumericFormat
            placeholder='0%'
            name='per'
            disabled={!(subLimit.typeDeductible === 'per')}
            allowLeadingZeros
            value={String(subLimit.deductible || '')}
            thousandSeparator=','
            customInput={Input}
            suffix={'%'}
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
              handleChangeItem({ target: { value: value.floatValue } }, 'deductible')
            }}
          />
        </InputForm>
        <FormHelperText sx={{ color: 'error.main', marginTop: '-3px' }}>
          {showErrors && errorCard.deductible}
        </FormHelperText>
        {subLimit.typeDeductible === 'per' ? (
          <>
            <FormControl fullWidth>
              <NumericFormat
                name='min'
                value={String(subLimit.min)}
                allowLeadingZeros
                thousandSeparator=','
                customInput={TextField}
                id='filled-multiline-flexible'
                label='Minimum'
                multiline
                prefix={'$'}
                variant='outlined'
                onValueChange={value => {
                  handleChangeItem({ target: { value: value.floatValue } }, 'min')
                }}
                isAllowed={values => {
                  const { floatValue } = values

                  return floatValue! >= 0 || floatValue === undefined
                }}
              />
              <FormHelperText sx={{ color: 'error.main' }}>{showErrors && errorCard.min}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='controlled-select-label'>Aplicable over</InputLabel>
              <Select
                sx={{ height: '56px' }}
                label='Aplicable over'
                labelId='controlled-select-label'
                value={subLimit.idCDeductiblePer}
                onChange={e => {
                  handleChangeItem(e, 'idCDeductiblePer')
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
              <FormHelperText sx={{ color: 'error.main' }}>{showErrors && errorCard.idCDeductiblePer}</FormHelperText>
            </FormControl>
          </>
        ) : null}
        <InputForm>
          <FormControlLabel
            sx={{ ml: 0.3 }}
            value='amount'
            control={
              <Radio
                sx={{ mr: -1 }}
                value='amount'
                onChange={e => {
                  handleChangeItem(e, 'typeDeductible')
                }}
              />
            }
            label=''
          />
          <NumericFormat
            placeholder='$0.00'
            name='amount'
            allowLeadingZeros
            value={String(subLimit.amount)}
            disabled={!(subLimit?.typeDeductible === 'amount')}
            thousandSeparator=','
            customInput={Input}
            prefix={'$'}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={value => {
              handleChangeItem({ target: { value: value.floatValue } }, 'amount')
            }}
            isAllowed={values => {
              const { floatValue } = values

              return floatValue! >= 0 || floatValue === undefined
            }}
          />
        </InputForm>
        <FormHelperText sx={{ color: 'error.main', marginTop: '-3px' }}>
          {showErrors && errorCard.amount}
        </FormHelperText>
      </RadioGroup>
      <FormHelperText sx={{ color: 'error.main' }}>{showErrors && errorCard.typeDeductible}</FormHelperText>
    </SubContainer>
  )
}

export default DeductibleMaterialDamage
export const validateDeductibleMaterialDamage = ({ typeDeductible }: { typeDeductible: string }) =>
  yup.object().shape({
    amount: yup
      .number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        if (typeDeductible !== 'amount') return true

        return +val > 0
      }),
    min: yup
      .number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (typeDeductible !== 'per') return true

        return +val > 0
      }),
    idCDeductiblePer: yup
      .number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0
        if (typeDeductible !== 'per') return true

        return +val > 0
      }),
    deductible: yup
      .number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        if (typeDeductible !== 'per') return true

        return +val > 0
      })
  })
