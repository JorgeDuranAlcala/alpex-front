import UserThemeOptions from '@/layouts/UserThemeOptions'
import { FormHelperText, TextField, Typography } from '@mui/material'
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { SubContainer } from 'src/styles/Forms/Sublimits'

export type CoinsuranceProps = {}

const Coinsurance: React.FC<CoinsuranceProps> = ({}) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle

  return (
    <SubContainer sx={{ height: 'auto' }}>
      <Typography variant='body1' sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}>
        Coinsurance
      </Typography>

      <NumericFormat
        label='%'
        placeholder='0%'
        name='coinsurance'
        allowLeadingZeros
        thousandSeparator=','
        customInput={TextField}
        value={''}
        suffix={'%'}
        decimalScale={2}
        sx={{
          width: '100%',
          height: '100%',
          '&:before, &:after': { display: 'none' }
        }}
        onValueChange={value => {
          // onChangeItem(value.floatValue, 'coinsurance')
        }}
        isAllowed={values => {
          const { floatValue } = values

          return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
        }}
      />
      <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
    </SubContainer>
  )
}

export default Coinsurance
