// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from '../CustomInput'

const PickersTime = ({
  popperPlacement,
  textPlace
}: {
  popperPlacement?: ReactDatePickerProps['popperPlacement']
  textPlace?: string
}) => {
  // ** States
  const [time, setTime] = useState<DateType>(new Date())

  return (
    <>
      <DatePicker
        showTimeSelect
        selected={time}
        timeIntervals={15}
        showTimeSelectOnly
        dateFormat='h:mm aa'
        id='time-only-picker'
        popperPlacement={popperPlacement}
        onChange={(date: Date) => setTime(date)}
        customInput={<CustomInput label={textPlace || 'Time Only'} sx={{ width: '100%' }} />}
      />
    </>
  )
}

export default PickersTime
