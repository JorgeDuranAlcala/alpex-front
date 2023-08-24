import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { MasterFiltersContext } from '../context/masterFilters/MasterFiltersContext';
import type { ARAPStatus, ARAPTransaction, QueryFilters } from '../interfaces/QueryFilters';


let timeoutService: ReturnType<typeof setTimeout> | null = null;

export const useMasterFilters = () => {

  const { updateFilters } = useContext(MasterFiltersContext);
  const isCallServiceOnChangeHandler = useRef<boolean>(false);

  const [queryFilters, setQueryFilters] = useState<QueryFilters>({
    broker: 'all',
    reinsurer: 'all',
    status: 'all',
    transaction: 'all',
    date: new Date(),
    id: '',
  });

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    isCallServiceOnChangeHandler.current = true;

    // console.log(event.target);

    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'broker') {
      setQueryFilters({
        ...queryFilters,
        broker: value,
      });

      return;
    }

    if (name === 'reinsurer') {
      setQueryFilters({
        ...queryFilters,
        reinsurer: value,
      });

      return;
    }

    if (name === 'status') {
      setQueryFilters({
        ...queryFilters,
        status: value as ARAPStatus,
      });

      return;
    }

    if (name === 'transaction') {
      setQueryFilters({
        ...queryFilters,
        transaction: value as ARAPTransaction,
      });

      return;
    }
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    isCallServiceOnChangeHandler.current = true;

    setQueryFilters({
      ...queryFilters,
      date,
    });
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {

    isCallServiceOnChangeHandler.current = true;

    // console.log(event.target);
    const target = event.target;
    const name = target.name;
    const value = target.value;


    if (name === 'id') {
      setQueryFilters(prev => ({
        ...prev,
        id: value,
      }));
    }
  }

  const callToFilterService = () => {
    updateFilters(queryFilters);
  }

  useEffect(() => {
    console.log('queryChanged');

    if (timeoutService) clearTimeout(timeoutService);

    timeoutService = setTimeout(() => {

      if (!isCallServiceOnChangeHandler.current) return;

      callToFilterService();

    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilters]);


  useEffect(() => {
    callToFilterService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return {
    queryFilters,
    handleSelectChange,
    handleDateChange,
    handleTextChange,
  }
}
