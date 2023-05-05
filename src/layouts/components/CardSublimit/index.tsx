import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { NumericFormat } from 'react-number-format'
import Icon from 'src/@core/components/icon'
import { ContainerCard, ContentCard, HeaderCard, SubContainer } from 'src/styles/Forms/Sublimits'

const SublimitCard = () => {
  return (
    <ContainerCard>
      <HeaderCard>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',

            // border: '1px solid white',
            alingItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '26px'
          }}
        >
          <Typography textTransform={'uppercase'} sx={{ color: '#FFF' }}>
            Wind
            {/* texto va a venir por props */}
          </Typography>
          <IconButton>
            <Icon icon='mdi:delete-outline' fontSize={22} color='#FFF' />
          </IconButton>
        </Box>
      </HeaderCard>
      <ContentCard>
        <SubContainer sx={{ flexDirection: 'row', height: '56px' }}>
          <FormControl sx={{ width: '64%' }}>
            <TextField
              variant='outlined'
              autoFocus
              label='Sublimit'
              value={'$10,000,000.00 USD'}
              InputProps={{
                disabled: true
              }}

              // onChange={e => handleChange('name', e.target.value)}
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
        <SubContainer sx={{ height: 'auto' }}>
          <FormControl>
            <Typography>Deductible material damage</Typography>
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
                control={<Radio sx={{ mr: 2 }} />}
                label='None'
              />
              <Box
                component={'div'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid rgba(87, 90, 111, 0.22)',
                  height: '58px'
                }}
              >
                <FormControlLabel sx={{ ml: 0.3 }} value='price' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  name='price'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    top: '-7px',
                    '&:before, &:after': { display: 'none' }
                  }}
                />
              </Box>

              <Box
                component={'div'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: '8px',
                  height: '58px',
                  border: '1px solid rgba(87, 90, 111, 0.22)'
                }}
              >
                <FormControlLabel sx={{ ml: 0.3 }} value='percentage' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  name='percentage'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'%'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    top: '-7px',
                    '&:before, &:after': { display: 'none' }
                  }}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </SubContainer>
        <SubContainer sx={{ height: '160px' }}>
          <FormControl>
            <Typography>Business interruption</Typography>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='radio-buttons-group'
              sx={{ height: '100%', gap: '10px' }}
            >
              <Box
                component={'div'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid rgba(87, 90, 111, 0.22)',
                  height: '58px'
                }}
              >
                <FormControlLabel sx={{ ml: 0.3 }} value='price' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  name='price'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    top: '-7px',
                    '&:before, &:after': { display: 'none' }
                  }}
                />
              </Box>

              <Box
                component={'div'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: '8px',
                  height: '58px',
                  border: '1px solid rgba(87, 90, 111, 0.22)'
                }}
              >
                <FormControlLabel sx={{ ml: 0.3 }} value='percentage' control={<Radio sx={{ mr: -1 }} />} label='' />
                <NumericFormat
                  name='percentage'
                  allowLeadingZeros
                  thousandSeparator=','
                  customInput={Input}
                  prefix={'$'}
                  decimalScale={2}
                  sx={{
                    width: '100%',
                    top: '-7px',
                    '&:before, &:after': { display: 'none' }
                  }}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </SubContainer>
        <SubContainer sx={{ height: '88px' }}>
          <FormControl>
            <Typography>Coinsurance</Typography>

            <Box
              component={'div'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid rgba(87, 90, 111, 0.22)',
                height: '58px',
                pl: 3
              }}
            >
              <NumericFormat
                name='price'
                allowLeadingZeros
                thousandSeparator=','
                customInput={Input}
                prefix={'%'}
                decimalScale={2}
                sx={{
                  width: '100%',

                  '&:before, &:after': { display: 'none' }
                }}
              />
            </Box>
          </FormControl>
        </SubContainer>
      </ContentCard>
    </ContainerCard>
  )
}

export default SublimitCard

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
