import UserThemeOptions from '@/layouts/UserThemeOptions'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { FormControlLabel, FormHelperText, Input, Radio, RadioGroup, Typography } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { InputForm, SubContainer } from 'src/styles/Forms/Sublimits'

export type BusinessInterruptionProps = {
  onHandleChangeDeductibleDamage: (deductibleDamage: SublimitDto) => void
  subLimit: SublimitDto
}

const BusinessInterruption: React.FC<BusinessInterruptionProps> = ({ subLimit, onHandleChangeDeductibleDamage }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle

  const handleChangeItem = (event: any, name: string) => {
    const subLimitTemp = { ...subLimit, [name]: event.target.value }

    onHandleChangeDeductibleDamage(subLimitTemp)
  }

  return (
    <SubContainer sx={{ height: 'auto' }}>
      <Typography variant='body1' sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}>
        Business interruption
      </Typography>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        value={subLimit.typeBi}
        name='radio-buttons-group'
        sx={{ height: '100%', gap: '10px', mt: 1 }}
        onChange={(_, val) => {
          handleChangeItem({ target: { value: val } }, 'typeBi')
        }}
      >
        <InputForm>
          <FormControlLabel sx={{ ml: 0.3 }} value='days' control={<Radio sx={{ mr: -1 }} />} label='' />
          {/* // error={} */}
          <NumericFormat
            placeholder='0 days'
            name='days'
            allowLeadingZeros
            value={String(subLimit.daysBi)}
            thousandSeparator=','
            customInput={Input}
            disabled={!(subLimit?.typeBi === 'days')}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={value => {
              handleChangeItem({ target: { value: value.floatValue } }, 'daysBi')
            }}
            isAllowed={values => {
              const { floatValue } = values

              return (floatValue! >= 0 && floatValue! <= 999) || floatValue === undefined
            }}
          />
        </InputForm>
        <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
        <InputForm>
          <FormControlLabel sx={{ ml: 0.3 }} value='money' control={<Radio sx={{ mr: -1 }} />} label='' />
          <NumericFormat
            placeholder='$0.00'
            name='amountBi'
            value={String(subLimit.amountBi)}
            allowLeadingZeros
            thousandSeparator=','
            disabled={!(subLimit?.typeBi === 'money')}
            customInput={Input}
            prefix={'$'}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={value => {
              handleChangeItem({ target: { value: value.floatValue } }, 'amountBi')
            }}
          />
        </InputForm>
        <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
        <FormHelperText sx={{ color: 'error.main', marginTop: '-5px' }}></FormHelperText>
      </RadioGroup>
    </SubContainer>
  )
}

export default BusinessInterruption
