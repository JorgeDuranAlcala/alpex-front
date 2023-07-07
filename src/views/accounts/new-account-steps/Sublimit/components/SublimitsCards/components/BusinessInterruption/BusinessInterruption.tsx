import UserThemeOptions from '@/layouts/UserThemeOptions'
import { FormControlLabel, FormHelperText, Input, Radio, RadioGroup, Typography } from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { InputForm, SubContainer } from 'src/styles/Forms/Sublimits'

export type BusinessInterruptionProps = {}

const BusinessInterruption: React.FC<BusinessInterruptionProps> = ({}) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle

  return (
    <SubContainer sx={{ height: 'auto' }}>
      <Typography variant='body1' sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}>
        Business interruption
      </Typography>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        value={''}
        name='radio-buttons-group'
        sx={{ height: '100%', gap: '10px', mt: 1 }}
        onChange={(_, val) => {
          console.log(val)

          // handleChangeRadioBI(val)
        }}
      >
        <InputForm>
          <FormControlLabel sx={{ ml: 0.3 }} value='days' control={<Radio sx={{ mr: -1 }} />} label='' />
          {/* // error={} */}
          <NumericFormat
            placeholder='0 days'
            name='days'
            allowLeadingZeros
            value={''}
            thousandSeparator=','
            customInput={Input}
            disabled={false}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={value => {
              console.log(value)

              // onChangeItem(value.floatValue, 'daysBi')
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
            value={''}
            allowLeadingZeros
            thousandSeparator=','
            disabled={false}
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

              // onChangeItem(value.floatValue, 'amountBi')
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
