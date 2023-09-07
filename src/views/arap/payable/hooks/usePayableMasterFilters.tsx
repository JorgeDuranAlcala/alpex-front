import { SelectChangeEvent } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';

import { PayableContext } from '../context/PayableContext';
import { PayableFilters } from '../interfaces/PayableFilters';


// const timeoutService: ReturnType<typeof setTimeout> | null = null;

export const usePayableMasterFilters = () => {

  const { isLoading, loadPayableGrid } = useContext(PayableContext);
  const isCallServiceOnChangeHandler = useRef<boolean>(false);

  const [payableFilters, setPayableFilters] = useState<PayableFilters>({
    capability: 'all',
    date: new Date().toISOString(),
  });

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    isCallServiceOnChangeHandler.current = true;

    // console.log(event.target);

    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'capability') {
      setPayableFilters({
        ...payableFilters,
        capability: value,
      });

      return;
    }

  }

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    isCallServiceOnChangeHandler.current = true;

    setPayableFilters({
      ...payableFilters,
      date: date.toISOString(),
    });
  }

  const callToFilterService = () => {
    loadPayableGrid(payableFilters);
  }

  useEffect(() => {
    console.log('queryChanged', isCallServiceOnChangeHandler.current);

    // if (timeoutService) clearTimeout(timeoutService);

    // timeoutService = setTimeout(() => {

    if (!isCallServiceOnChangeHandler.current) return;

    callToFilterService();

    // }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payableFilters]);


  useEffect(() => {
    callToFilterService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return {
    isLoading,
    payableFilters,
    handleSelectChange,
    handleDateChange,
  }
}
