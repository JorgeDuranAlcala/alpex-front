import { InputDate } from '@/views/arap/_commons/components/inputs/InputDate';
import { useEffect, useState } from 'react';
import { useMasterFiltersStorage } from '../../../hooks/useMasterFiltersStorage';

interface InputDateFilterProps  {
  value: string | number | Date
  onChange: (date: Date | null) => void
}

export const InputDateFilter = ({ value, onChange }: InputDateFilterProps) => {

  const {handleSaveMasterFilters} = useMasterFiltersStorage();
  const [dateValue, setDatetValue] = useState(value)

  // console.log(dateValue)

  const handleOnChange = (date: Date | null) => {
    if (!date) return
    
    const dateToSave = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    setDatetValue(dateToSave)
    
      handleSaveMasterFilters({
        items:  [{
          value: dateToSave,
          text: 'date'
        }],
        saveValue: dateToSave,
        itemFieldFilter: 'value',
        itemFieldValue: 'text',
        type: 'date'
      })

      onChange(date);
      
  }

  useEffect(() => {
    setDatetValue(dateValue)
  }, [value])
  

  return (
      <InputDate value={dateValue} onChange={date => handleOnChange(date)} />
  )
}
