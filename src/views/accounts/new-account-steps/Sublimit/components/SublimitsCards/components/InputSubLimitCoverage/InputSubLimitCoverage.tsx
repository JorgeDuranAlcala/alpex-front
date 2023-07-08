import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import * as yup from 'yup'
import { FormErrors } from '../../../../Sublimits'

export type InputSubLimitCoverageProps = {
  limit: number
  isNotYesLuc: boolean
  subLimit: SublimitDto
  onChangeInput: (subLimitAmount: number) => void
  onChangeYesOrLuc: (subLimitAmount: string) => void
  errorCard: FormErrors
}

const InputSubLimitCoverage: React.FC<InputSubLimitCoverageProps> = ({
  limit,
  onChangeInput,
  isNotYesLuc,
  onChangeYesOrLuc,
  subLimit,
  errorCard
}) => {
  const [limitAmount, setLimitAmount] = useState<number>(subLimit.sublimit)
  const [isCheckAt100, setIsCheckAt100] = useState<boolean>(false)
  const [yesOrLuc, setYesOrLuc] = useState<string>('')

  const handleChangeSubLimit = (subLimitAmount: number) => {
    onChangeInput(subLimitAmount)
    setLimitAmount(subLimitAmount)
  }
  const onChangeCheckAt100 = () => {
    onChangeInput(!isCheckAt100 ? limit : 0)
    setLimitAmount(!isCheckAt100 ? limit : 0)
    setIsCheckAt100(!isCheckAt100)
  }
  const handleChangeRadioYesLuc = (value: string) => {
    setYesOrLuc(value)
    onChangeYesOrLuc(value)
  }
  useEffect(() => {
    console.log({ limitAmount, limit: Number(limit) })
    if (limitAmount !== Number(limit)) {
      setIsCheckAt100(false)
    } else {
      setIsCheckAt100(true)
    }
  }, [limitAmount])

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={9} sm={9}>
          <FormControl fullWidth>
            <NumericFormat
              name='subLimit'
              value={limitAmount}
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              id='filled-multiline-flexible'
              label='subLimit'
              multiline
              prefix={'$'}
              decimalScale={2}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = +limit
                if ((floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined) {
                  return true
                }

                return false
              }}
              variant='outlined'
              disabled={false}
              onValueChange={value => {
                handleChangeSubLimit(Number(value.floatValue))
              }}
            />
            <FormHelperText sx={{ color: 'error.main', marginLeft: '2px' }}>{errorCard.sublimit}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Checkbox
              checked={isCheckAt100}
              onChange={() => {
                onChangeCheckAt100()
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
        </Grid>
      </Grid>
      {!isNotYesLuc && (
        <Grid container>
          <Grid item xs={9} sm={9} mt={8}>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='yes'
              name='radio-buttons-group'
              value={yesOrLuc}
              row
              onChange={(_, val) => {
                handleChangeRadioYesLuc(val)
              }}
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <FormControlLabel value='yes' control={<Radio sx={{ mr: 2 }} />} label='Yes' />
              <FormControlLabel value='luc' control={<Radio sx={{ mr: 2 }} />} label='Luc' />
            </RadioGroup>
          </Grid>
          <Grid item xs={3} sm={3}></Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default InputSubLimitCoverage
export const inputSublimit_validations = ({ limit }: { limit: number }) =>
  yup.object().shape({
    sublimit: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val <= limit && +val > 0
      })
      .required('This field is required')
  })
