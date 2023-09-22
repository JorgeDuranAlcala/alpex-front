// ** React Imports
import { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { PaymentsContext } from '@/views/arap/overview/context/payments/PaymentsContext'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface PickerProps {
  label?: string
}

const CustomInputWithIcon = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      variant='standard'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Icon icon='mdi:calendar-blank' fontSize={20} />
          </InputAdornment>
        )
      }}
      sx={{
        width: { sm: '180px', xs: '150px' },
        padding: '0',
        '& .MuiInputBase-input': { color: 'text.secondary', fontFamily: 'Inter' },
        '& .MuiFormLabel-root': { padding: '0', fontFamily: 'Inter' }
      }}
      {...props}
    />
  )
})

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      variant='standard'
      sx={{
        width: { sm: '180px', xs: '150px' },
        padding: '0',
        '& .MuiInputBase-input': { color: 'text.secondary', fontFamily: 'Inter' },
        '& .MuiFormLabel-root': { padding: '0', fontFamily: 'Inter' }
      }}
      {...props}
    />
  )
})

const FilterMenuTransactionDate = () => {

  const { handleChangeFilters } = useContext(PaymentsContext);

  const [transactionDate, setTransactionDate] = useState<DateType>(new Date())
  const [month, setMonth] = useState<DateType>(null)
  const [year, setYear] = useState<DateType>(null)
  const [subtype, setSubtype] = useState<string>('fulldate')



  const dateTransform = (date: DateType) => {
    if (!date) return ''

    return subtype === 'fulldate'
      ? date!.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : subtype === 'month'
        ? date!.toLocaleDateString('en-US', { month: 'long' })
        : date!.toLocaleDateString('en-US', { year: 'numeric' })
  }

  const dateTransformNumber = (date: DateType) => {
    if (!date) return ''

    return date!.toLocaleDateString('en-CA', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit'
    })
  }

  useEffect(() => {
    if (subtype === 'fulldate') {
      setMonth(null)
      setYear(null)
    }
    if (subtype === 'month') {
      setTransactionDate(null)
      setYear(null)
    }
    if (subtype === 'year') {
      setTransactionDate(null)
      setMonth(null)
    }
  }, [subtype])

  const handleClick = () => {
    let newDateValue = ''

    if (subtype === 'fulldate') {
      newDateValue = dateTransformNumber(transactionDate)
    } else if (subtype === 'month') {
      newDateValue = dateTransformNumber(month)
    } else {
      newDateValue = dateTransformNumber(year)
    }


    handleChangeFilters({
      type: 'transactionDate',
      text: `Transaction: ${subtype === 'fulldate'
        ? dateTransform(transactionDate)
        : subtype === 'month'
          ? dateTransform(month)
          : dateTransform(year)
        }`,
      value: newDateValue,
      subtype
    })
  }

  return (
    <>
      <Box component={'li'} sx={{ padding: '8px 16px 12px 16px' }}>
        <DatePickerWrapper>
          <DatePicker
            selected={transactionDate}
            showMonthDropdown
            showYearDropdown
            showDisabledMonthNavigation
            shouldCloseOnSelect
            id='effective-date'
            customInput={<CustomInputWithIcon label='Write a full date' />}
            onChange={(date: Date) => {
              setTransactionDate(date)
              setSubtype('fulldate')
            }}
            popperProps={{ strategy: 'fixed' }}
            popperPlacement='left'
            popperModifiers={[
              {
                name: 'offset',
                options: {
                  offset: [120, 10]
                }
              }
            ]}
          />
        </DatePickerWrapper>
      </Box>

      <Box component={'li'} sx={{ padding: '12px 16px' }}>
        <Divider textAlign='left' sx={{ fontFamily: 'Inter', color: 'GrayText' }}>
          or
        </Divider>
      </Box>

      <Box component={'li'} sx={{ padding: '12px 16px 8px 16px' }}>
        <Box sx={{ marginBottom: '12px' }}>
          <DatePickerWrapper>
            <DatePicker
              showMonthYearPicker
              dateFormat='MMMM'
              selected={month}
              shouldCloseOnSelect
              id='month'
              customInput={<CustomInput label='By month' />}
              onChange={(date: Date) => {
                setMonth(date)
                setSubtype('month')
              }}
              popperClassName='account-datepicker-popper-only-month'
              popperProps={{ strategy: 'fixed' }}
              popperPlacement='left'
              popperModifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [120, 10]
                  }
                }
              ]}
            />
          </DatePickerWrapper>
        </Box>

        <Box sx={{ marginBottom: '12px' }}>
          <DatePickerWrapper>
            <DatePicker
              showYearPicker
              dateFormat='yyyy'
              selected={year}
              shouldCloseOnSelect
              id='year'
              customInput={<CustomInput label='By year' />}
              onChange={(date: Date) => {
                setYear(date)
                setSubtype('year')
              }}
              popperProps={{ strategy: 'fixed' }}
              popperPlacement='left'
              popperModifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [120, 10]
                  }
                }
              ]}
            />
          </DatePickerWrapper>
        </Box>
      </Box>
      <Box component={'li'} sx={{ padding: '0 16px 12px 16px', textAlign: 'center' }}>
        <Button onClick={handleClick} sx={{ fontFamily: 'Inter' }} variant='outlined'>
          APPLY FILTER
        </Button>
      </Box>
    </>
  )
}

export default FilterMenuTransactionDate
