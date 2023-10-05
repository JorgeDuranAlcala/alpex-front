import { formatDateAmericanTemplate } from '@/utils/formatDates'
import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { MasterFiltersContext } from '../context/masterFilters/MasterFiltersContext'
import type { ARAPStatus, ARAPTransactionValue, QueryFilters } from '../interfaces/QueryFilters'
import { useMasterFiltersStorage } from './useMasterFiltersStorage'

let timeoutService: ReturnType<typeof setTimeout> | null = null

export const useMasterFilters = () => {
  const { updateFilters } = useContext(MasterFiltersContext)
  const { getMasterFiltersSelectors } = useMasterFiltersStorage();
  const masterFilters = getMasterFiltersSelectors();

  const isCallServiceOnChangeHandler = useRef<boolean>(false)
  const isCallServiceWithTimeout = useRef<boolean>(false)
  const getValueFromStorage = (type:string): string | number | null => {
    return masterFilters.find(item => item.type === type)?.value ?? null
  }
  const queryValues = {
    broker: getValueFromStorage('broker'),
    reinsurer: getValueFromStorage('reinsurer'),
    status: getValueFromStorage('status') as ARAPStatus,
    transactionType: getValueFromStorage('transactionType') as ARAPTransactionValue,
    date: getValueFromStorage('date') as string,
    id: getValueFromStorage('id') as string,
  }
  
  const [queryFilters, setQueryFilters] = useState<QueryFilters>({
    broker: queryValues.broker?.toString() || 'all',
    reinsurer: queryValues.reinsurer?.toString() || 'all',
    status:  queryValues.status || 'all',
    transactionType:  queryValues.transactionType || 'all',
    date: queryValues.date ||  formatDateAmericanTemplate(new Date()),
    id:  queryValues.id || '',
  })

 

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    isCallServiceOnChangeHandler.current = true
    isCallServiceWithTimeout.current = false

    // console.log(event.target);

    const target = event.target
    const name = target.name
    const value = target.value

    

    if (name === 'broker') {
      setQueryFilters({
        ...queryFilters,
        broker: value
      })

      return
    }

    if (name === 'reinsurer') {
      setQueryFilters({
        ...queryFilters,
        reinsurer: value
      })

      return
    }

    if (name === 'status') {
      setQueryFilters({
        ...queryFilters,
        status: value as ARAPStatus
      })

      return
    }
    if (name === 'transactionType') {

      setQueryFilters({
        ...queryFilters,
        transactionType: value as ARAPTransactionValue
      })

      return
    }
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) return

    isCallServiceOnChangeHandler.current = true
    isCallServiceWithTimeout.current = false

    setQueryFilters({
      ...queryFilters,
      date: formatDateAmericanTemplate(date)
    })
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    isCallServiceOnChangeHandler.current = true
    isCallServiceWithTimeout.current = true

    // console.log(event.target);
    const target = event.target
    const name = target.name
    const value = target.value

    if (name === 'id') {
      setQueryFilters(prev => ({
        ...prev,
        id: value
      }))
    }
  }

  const callToFilterService = () => {
    updateFilters(queryFilters)
  }

  useEffect(() => {

    if (timeoutService) clearTimeout(timeoutService)

    if (isCallServiceWithTimeout.current) {
      timeoutService = setTimeout(() => {
        if (!isCallServiceOnChangeHandler.current) return

        callToFilterService()
      }, 500)
    } else {
      if (!isCallServiceOnChangeHandler.current) return
      callToFilterService()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilters])

  useEffect(() => {
    callToFilterService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    queryFilters,
    handleSelectChange,
    handleDateChange,
    handleTextChange
  }
}
