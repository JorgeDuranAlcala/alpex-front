import { SelectChangeEvent } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'

import { ReceivableContext } from '../context/ReceivableContext'
import { ReceivableFilters } from '../interfaces/ReceivableFilters'

// let timeoutService: ReturnType<typeof setTimeout> | null = null;

export const useReceivableMasterFilters = () => {
  const { isLoading, loadReceivableGrid, receivableGrid } = useContext(ReceivableContext)
  const isCallServiceOnChangeHandler = useRef<boolean>(false)

  const [receivableFilters, setReceivableFilters] = useState<ReceivableFilters>({
    capability: 'all',
    date: new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit'
      })
  })

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    isCallServiceOnChangeHandler.current = true

    console.log(event.target);

    const target = event.target
    const name = target.name
    const value = target.value

    if (name === 'capability') {
      setReceivableFilters({
        ...receivableFilters,
        capability: value
      })

      return
    }
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) return

    isCallServiceOnChangeHandler.current = true

    setReceivableFilters({
      ...receivableFilters,
      date: date.toISOString()
    })
  }

  const handleDownloadData = () => {
    console.log('download data', receivableGrid)
  }

  const callToFilterService = () => {
    loadReceivableGrid(receivableFilters)
  }

  useEffect(() => {
    console.log('queryChanged')

    // if (timeoutService) clearTimeout(timeoutService);

    // timeoutService = setTimeout(() => {

    if (!isCallServiceOnChangeHandler.current) return

    callToFilterService()

    // }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivableFilters])

  useEffect(() => {
    callToFilterService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLoading,
    receivableFilters,
    handleSelectChange,
    handleDateChange,
    handleDownloadData
  }
}
