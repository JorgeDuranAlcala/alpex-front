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
  onHandleChangeSubLimit: (subLimit: SublimitDto) => void
  showErrors: boolean
  errorCard: FormErrors
}

const InputSubLimitCoverage: React.FC<InputSubLimitCoverageProps> = ({
  limit,
  onHandleChangeSubLimit,
  isNotYesLuc,
  showErrors,
  subLimit,
  errorCard
}) => {
  const [limitAmount, setLimitAmount] = useState<number>(subLimit.sublimit)
  const [isCheckAt100, setIsCheckAt100] = useState<boolean>(false)
  const [yesOrLuc, setYesOrLuc] = useState<string>(subLimit.yes ? 'yes' : 'luc')

  const handleChangeSubLimit = (subLimitAmount: number) => {
    const subLimitTemp = { ...subLimit }
    subLimitTemp.sublimit = subLimitAmount
    onHandleChangeSubLimit(subLimitTemp)
    setLimitAmount(subLimitAmount)
  }
  const onChangeCheckAt100 = () => {
    const subLimitTemp = { ...subLimit }
    subLimitTemp.at100 = !isCheckAt100
    subLimitTemp.sublimit = !isCheckAt100 ? limit : 0
    onHandleChangeSubLimit(subLimitTemp)

    setLimitAmount(subLimitTemp.sublimit)
    setIsCheckAt100(subLimitTemp.at100)
  }
  const handleChangeRadioYesLuc = (value: string) => {
    const subLimitTemp = { ...subLimit }
    subLimitTemp.yes = value === 'yes'
    subLimitTemp.luc = value === 'luc'
    onHandleChangeSubLimit(subLimitTemp)
    setYesOrLuc(value)
  }
  useEffect(() => {
    if (limitAmount !== Number(limit)) {
      setIsCheckAt100(false)
    } else {
      setIsCheckAt100(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <FormHelperText sx={{ color: 'error.main', marginLeft: '2px' }}>
              {showErrors && errorCard.sublimit}
            </FormHelperText>
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
            <FormHelperText sx={{ color: 'error.main' }}>{showErrors && errorCard.luc}</FormHelperText>
          </Grid>
          <Grid item xs={3} sm={3}></Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default InputSubLimitCoverage
export const inputSublimit_validations = ({ limit, isNotYesLuc }: { limit: number; isNotYesLuc: boolean }) =>
  yup.object().shape({
    sublimit: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        return +val <= limit && +val > 0
      })
      .required('This field is required'),
    yes: yup
      .boolean()
      .nullable()
      .test('', 'This field is required', value => {
        if (isNotYesLuc) return true

        return value !== null
      }),
    luc: yup
      .boolean()
      .nullable()
      .test('', 'This field is required', value => {
        if (isNotYesLuc) return true

        return value !== null
      })
  })
