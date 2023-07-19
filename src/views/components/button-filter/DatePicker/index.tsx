import { Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import fonts from 'src/views/accounts/font'

const DatePickerFilter = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const useColor = userThemeConfig.palette?.buttonText.primary

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Write a full date'
          value={value}
          onChange={newValue => setValue(newValue)}
          sx={{ width: '208px' }}

          // disabled
        />
        <Box
          sx={{
            width: '100%',
            height: '28px',
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '4px',
            gap: '5px'
          }}
        >
          <Box sx={{ width: '5%', border: '1px solid rgba(68, 72, 84, 0.12)' }} />
          <Typography
            variant='body2'
            sx={{ mb: 1, fontFamily: fonts.inter, fontSize: fonts.size.px14, fontWeight: 400 }}
          >
            or
          </Typography>
          <Box sx={{ width: '85%', border: '1px solid rgba(68, 72, 84, 0.12)' }} />
        </Box>
        <Box sx={{ mt: 4, '& > :not(style)': { width: '100%' } }}>
          <TextField id='standard-basic' label='By month' variant='standard' sx={{ fontFamily: inter }} />
        </Box>
        <Box sx={{ mt: 4, '& > :not(style)': { width: '100%' } }}>
          <TextField id='standard-basic' label='By year' variant='standard' />
        </Box>
        <Button
          variant='outlined'
          sx={{
            width: 'auto',
            height: '30px',
            fontSize: fonts.size.px13,
            fontFamily: inter,
            mt: 6,
            left: '38%',
            fontWeight: 500,
            color: useColor
          }}
        >
          Apply filter
        </Button>
      </LocalizationProvider>
    </>
  )
}

export default DatePickerFilter
