import UserThemeOptions from '@/layouts/UserThemeOptions'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
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
import { ChangeEvent, useState } from 'react'
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

const GenericCard: React.FC<RenderFormGeneric> = ({
  title,
  handleOnDeleteForm,
  handleOnChangeByInputForm,
  formInformation,
  index = 0,
  formErrors,
  data
}: RenderFormGeneric) => {
  // const [selectedValueRadio, setSelectedValueRadio] = useState<string>('')
  // const [, setErrorForm] = useState({})
  const [errors] = useState<FormErrors>({
    minError: false,
    coinsuranceError: false,
    daysError: false,
    priceInterruptionError: false
  })

  const onChangeItem = (value: any, name: keyof SublimitDto) => {
    handleOnChangeByInputForm(index, { name, value })
  }

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    handleOnChangeByInputForm(index, { name: 'typeDeductible', value: event.target.value })
  }

  const handleChangeRadioBI = (value: string) => {
    value === 'days'
      ? handleOnChangeByInputForm(index, { name: 'typeBi', value: 'days' })
      : handleOnChangeByInputForm(index, { name: 'typeBi', value: 'money' })
  }

  const handleChangeRadioYesLuc = (value: string) => {
    value === 'yes'
      ? handleOnChangeByInputForm(index, { name: 'yes', value: true })
      : handleOnChangeByInputForm(index, { name: 'luc', value: true })
  }

  const handleRadio = () => {
    if (data?.yes) return 'yes'
    if (data?.luc) return 'luc'
    if (!data?.yes && !data?.luc) return ''
  }

  const onDeleteItem = async () => {
    await handleOnDeleteForm(index)
  }

  const options = [
    { name: 'Loss', id: 1 },
    { name: "TIV's", id: 2 },
    { name: 'Affected item', id: 3 }
  ]

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle

  return (
    <ContainerCard>
      <HeaderCard sx={{ height: data?.title === 'Business Interruption Machinery Breakdown' ? '68px' : '48px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alingItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: data?.title === 'Business Interruption Machinery Breakdown' ? '52px' : '26px'

            // border: '1px solid white'
          }}
        >
          <Typography textTransform={'uppercase'} sx={{ color: '#FFF' }}>
            {data?.title}
          </Typography>
          <IconButton onClick={onDeleteItem}>
            <Icon icon='mdi:delete-outline' fontSize={22} color='#FFF' />
          </IconButton>
        </Box>
      </HeaderCard>
      <ContentCard>
        <SubContainer sx={{ flexDirection: 'row', height: '56px' }}>
          <FormControl sx={{ width: '64%' }}>
            <NumericFormat
              name='sublimit'
              value={data?.sublimit}
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
                  return true
                }

                return false
              }}
              variant='outlined'
              disabled={data?.at100}
              onValueChange={value => {
                onChangeItem(value.floatValue, 'sublimit')
              }}
            />
            <FormHelperText sx={{ color: 'error.main' }}>{formErrors.sublimit}</FormHelperText>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '8px', width: '88px' }}>
            <Checkbox
              checked={data?.at100}
              onChange={e => {
                onChangeItem(e.target.checked, 'at100')
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
        {data?.title === 'Terrorism' || title === 'Business  Interruption' ? (
          <SubContainer sx={{ height: 'auto' }}>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='yes'
              name='radio-buttons-group'
              value={handleRadio()}
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
        {data?.title !== 'Business interruption' ? (
          <SubContainer sx={{ height: 'auto' }}>
            <Typography
              variant='body1'
              sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}
            >
              Deductible material damage
            </Typography>
            <RadioGroup
              value={data?.typeDeductible}
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
                  control={<Radio sx={{ mr: -1 }} value={'per'} onChange={handleChangeRadio} />}
                  label=''
                />
                <NumericFormat
                  placeholder='0%'
                  name='per'
                  disabled={!(data?.typeDeductible === 'per')}
                  allowLeadingZeros
                  value={data?.deductible}
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
                    onChangeItem(value.floatValue, 'deductible')
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors.deductible}</FormHelperText>
              </InputForm>
              {data?.typeDeductible === 'per' ? (
                <>
                  <FormControl fullWidth>
                    <NumericFormat
                      name='min'
                      value={data?.min}
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
                        onChangeItem(value.floatValue, 'min')
                      }}
                      isAllowed={values => {
                        const { floatValue } = values

                        return floatValue! >= 0 || floatValue === undefined
                      }}
                    />
                    <FormHelperText sx={{ color: 'error.main' }}>{formErrors.min}</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Aplicable over</InputLabel>
                    <Select
                      sx={{ height: '56px' }}
                      label='Aplicable over'
                      labelId='controlled-select-label'
                      value={data?.idCDeductiblePer}
                      onChange={e => {
                        onChangeItem(e.target.value, 'idCDeductiblePer')
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
                    <FormHelperText sx={{ color: 'error.main' }}>{formErrors.idCDeductiblePer}</FormHelperText>
                  </FormControl>
                </>
              ) : null}
              <InputForm>
                <FormControlLabel
                  sx={{ ml: 0.3 }}
                  value='amount'
                  control={<Radio sx={{ mr: -1 }} value='amount' onChange={handleChangeRadio} />}
                  label=''
                />
                <NumericFormat
                  placeholder='$0.00'
                  name='amount'
                  allowLeadingZeros
                  value={data?.amount}
                  disabled={!(data?.typeDeductible === 'amount')}
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
                    onChangeItem(value.floatValue, 'amount')
                  }}
                  isAllowed={values => {
                    const { floatValue } = values

                    return floatValue! >= 0 || floatValue === undefined
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors.amount}</FormHelperText>
              </InputForm>
            </RadioGroup>
          </SubContainer>
        ) : null}
        {data?.title === 'Machinery Breakdown' || title === 'AMIT & SRCC' || title === 'Electronic Equipment' ? (
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
            >
              <MenuItem key={0} value={0}>
                {'No options available'}
              </MenuItem>
            </Select>
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
              value={data?.typeBi}
              name='radio-buttons-group'
              sx={{ height: '100%', gap: '10px', mt: 1 }}
              onChange={(_, val) => handleChangeRadioBI(val)}
            >
              <InputForm>
                <FormControlLabel sx={{ ml: 0.3 }} value='days' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  placeholder='0 days'
                  name='days'
                  allowLeadingZeros
                  value={data?.daysBi}
                  thousandSeparator=','
                  customInput={Input}
                  disabled={!(data?.typeBi === 'days')}
                  decimalScale={2}
                  error={errors.daysError}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={value => {
                    onChangeItem(value.floatValue, 'daysBi')
                  }}
                  isAllowed={values => {
                    const { floatValue } = values

                    return (floatValue! >= 0 && floatValue! <= 999) || floatValue === undefined
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors.daysBi}</FormHelperText>

                {false && <FormHelperText sx={{ color: 'error.main' }}>Required Field</FormHelperText>}
              </InputForm>

              <InputForm>
                <FormControlLabel sx={{ ml: 0.3 }} value='money' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  placeholder='$0.00'
                  name='amountBi'
                  value={data?.amountBi}
                  allowLeadingZeros
                  thousandSeparator=','
                  disabled={!(data?.typeBi === 'money')}
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '&:before, &:after': { display: 'none' }
                  }}
                  onValueChange={value => {
                    onChangeItem(value.floatValue, 'amountBi')
                  }}
                />
                <FormHelperText sx={{ color: 'error.main' }}>{formErrors.amountBi}</FormHelperText>
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
            value={data?.coinsurance}
            suffix={'%'}
            decimalScale={2}
            sx={{
              width: '100%',
              height: '100%',
              '&:before, &:after': { display: 'none' }
            }}
            onValueChange={value => {
              onChangeItem(value.floatValue, 'coinsurance')
            }}
            isAllowed={values => {
              const { floatValue } = values

              return (floatValue! >= 0 && floatValue! <= 100) || floatValue === undefined
            }}
          />
          <FormHelperText sx={{ color: 'error.main' }}>{formErrors.coinsurance}</FormHelperText>
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
