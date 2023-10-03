// ** React Imports
import { ForwardedRef, forwardRef, useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types'
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType'
import { DateType } from 'src/types/forms/reactDatepickerTypes'


import { OverviewDetailsContext } from '@/views/arap/overview/context/overviewDetails/OverviewDetailsContext'

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

interface FilterMenuDateProps {
  detailsType: DetailsType;
  columnType: string;
  auxFilterText: string;
  handleClose?: () => void
}

const FilterMenuDate = ({ detailsType, columnType, auxFilterText, handleClose }: FilterMenuDateProps) => {

  const { handleChangeFilters } = useContext(OverviewDetailsContext);

  const [inputDate, setInputDate] = useState<DateType>(new Date())
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
      setInputDate(null)
      setYear(null)
    }
    if (subtype === 'year') {
      setInputDate(null)
      setMonth(null)
    }
  }, [subtype])

  const handleClick = () => {
    let newDateValue = ''

    if (subtype === 'fulldate') {
      newDateValue = dateTransformNumber(inputDate)
    } else if (subtype === 'month') {
      newDateValue = dateTransformNumber(month)
    } else {
      newDateValue = dateTransformNumber(year)
    }


    handleChangeFilters({
      type: columnType,
      text: `${auxFilterText}: ${subtype === 'fulldate'
        ? dateTransform(inputDate)
        : subtype === 'month'
          ? dateTransform(month)
          : dateTransform(year)
        }`,
      value: newDateValue,
      subtype
    }, detailsType)

    if (handleClose) {
      handleClose();
    }
  }

  return (
    <>
      <Box component={'li'} sx={{ padding: '8px 16px 12px 16px' }}>
        <DatePickerWrapper>
          <DatePicker
            selected={inputDate}
            showMonthDropdown
            showYearDropdown
            showDisabledMonthNavigation
            shouldCloseOnSelect
            id='effective-date'
            customInput={<CustomInputWithIcon label='Write a full date' />}
            onChange={(date: Date) => {
              setInputDate(date)
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
        
      <Box component={'li'} sx={{ padding: '0 16px 12px 16px', textAlign: 'center' }}>
        <Button onClick={handleClick} sx={{ fontFamily: 'Inter' }} variant='outlined'>
          APPLY FILTER
        </Button>
      </Box>
    </>
  )
}

export default FilterMenuDate
