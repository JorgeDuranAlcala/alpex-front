import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import DialogCustomAlpex from '@/views/components/dialogs/DialogCustomAlpex'
import {
  Box,
  Checkbox,
  FormControl,
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
import { ContainerRadioGroup } from './RadioGroup'

export type InputSubLimitCoverageProps = {
  limit: number
  isNotYesLuc: boolean
  subLimit: SublimitDto
  onHandleChangeSubLimit: (subLimit: SublimitDto) => void
  showErrors: boolean
  errorCard: FormErrors
  subLimits: SublimitDto[]
}

const InputSubLimitCoverage: React.FC<InputSubLimitCoverageProps> = ({
  limit,
  onHandleChangeSubLimit,
  isNotYesLuc,
  showErrors,
  subLimit,
  errorCard,
  subLimits
}) => {
  const [limitAmount, setLimitAmount] = useState<number>(subLimit.sublimit)
  const [isCheckAt100, setIsCheckAt100] = useState<boolean>(false)
  const [yesOrLuc, setYesOrLuc] = useState<string>(subLimit.yes ? 'yes' : 'luc')
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const [prevSublimit, setPrevSublimit] = useState<number>(subLimit.sublimit)
  const [sublimitId, setSublimitId] = useState<number | undefined>(subLimit.id)

  // console.log({ limit })
  // console.log({ limitAmount })
  // console.log({ subLimits })
  // console.log({ prevSublimit })
  // console.log({ sublimitId })

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

  const onChangeKeepSublimit = () => {
    subLimits.forEach(item => {
      if (item.id === sublimitId) setLimitAmount(prevSublimit)
    })
    setOpenDialog(false)
  }
  const handleChangeRadioYesLuc = (value: string) => {
    const subLimitTemp = { ...subLimit }
    subLimitTemp.yes = value === 'yes'
    subLimitTemp.luc = value === 'luc'
    onHandleChangeSubLimit(subLimitTemp)
    setYesOrLuc(value)
  }

  useEffect(() => {
    const subLimitTemp = { ...subLimit }
    setPrevSublimit(subLimitTemp.sublimit)
    setSublimitId(subLimitTemp.id)


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (limitAmount !== Number(limit)) {
      setIsCheckAt100(false)
    } else {
      setIsCheckAt100(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitAmount])

  useEffect(() => {
    if (subLimits.length > 0 && !openDialog) {
      subLimits.forEach(subL => {
        if (limitAmount > subL.sublimit) {
          setOpenDialog(true)
        } else {
          setOpenDialog(false)
        }
      })
      console.log('hay mas de 1 card')
      console.log({ openDialog })
    }
    if (limitAmount > Number(limit)) {
      setOpenDialog(true)
    } else {
      setOpenDialog(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitAmount])

  useEffect(() => {
    setOpenDialog(openDialog)
  }, [openDialog])

  useEffect(() => {
    if (!isNotYesLuc) {
      const subLimitTemp = { ...subLimit }
      subLimitTemp.yes = false
      subLimitTemp.luc = true
      onHandleChangeSubLimit(subLimitTemp)
      setYesOrLuc(subLimitTemp.yes ? 'yes' : 'luc')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              label='Sublimit'
              multiline
              prefix={'$'}
              decimalScale={2}
              isAllowed={values => {
                const { floatValue } = values
                const upLimit = +limit

                if (
                  (floatValue! >= 0 && (floatValue! <= upLimit || floatValue! >= upLimit)) ||
                  floatValue === undefined
                ) {
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
              defaultValue='luc'
              name='radio-buttons-group'
              value={yesOrLuc}
              row
              onChange={(_, val) => {
                handleChangeRadioYesLuc(val)
              }}
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <ContainerRadioGroup>
                <Radio value='yes' sx={{ mr: 0 }} />
                <label className="YesLabel">Yes</label>
              </ContainerRadioGroup>
              <ContainerRadioGroup>

                <Radio value='luc' sx={{ mr: 0 }} />
                <label className="YesLabel">Luc</label>
              </ContainerRadioGroup>
            </RadioGroup>
            <FormHelperText sx={{ color: 'error.main' }}>{showErrors && errorCard.luc}</FormHelperText>
          </Grid>
          <Grid item xs={3} sm={3}></Grid>
        </Grid>
      )}
      {openDialog && (
        <DialogCustomAlpex
          openDialog={openDialog}
          body={`The current sublimit exceeds the originally established limit.`}
          subBody={`Confirm the new higher sublimit or cancel to close this message.`}
          title={'Sublimit adjustment alert'}
          resolve={subLimit.id === undefined ? onChangeCheckAt100 : () => onChangeKeepSublimit()}
          reject={() => setOpenDialog(false)}
          sublimits={true}
        />
      )}
    </Grid>
  )
}

export default InputSubLimitCoverage

export const inputSublimit_validations = ({
  limit,
  isNotYesLuc,
  luc
}: {
  limit: number
  isNotYesLuc: boolean
  luc: boolean
}) =>
  yup.object().shape({
    sublimit: yup
      .number()
      .transform((_, val) => (val === Number(val) ? val : null))
      .test('', 'This field is required', value => {
        const val = value || 0

        if (luc && val >= 0 && (+val >= limit || +val <= limit) && !isNotYesLuc) return true

        return (+val >= limit || +val <= limit) && +val > 0
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
