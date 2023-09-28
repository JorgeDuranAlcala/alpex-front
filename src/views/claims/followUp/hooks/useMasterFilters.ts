import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { MasterFiltersContext } from '../context/masterFilters/MasterFiltersContext';
import type { QueryFilters } from '../interfaces/QueryFilters';


let timeoutService: ReturnType<typeof setTimeout> | null = null;

export const useMasterFiltersFollowUp = () => {

  const { updateFilters } = useContext(MasterFiltersContext);
  const isCallServiceOnChangeHandler = useRef<boolean>(false);

  const [queryFilters, setQueryFilters] = useState<QueryFilters>({
    claimNumber: 'all',
    executive: 'all',
    date: new Date(),
    id: '',
  });

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    isCallServiceOnChangeHandler.current = true;

    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'executive') {
      setQueryFilters({
        ...queryFilters,
        executive: value,
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

    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'claimNumber') {
      setQueryFilters({
        ...queryFilters,
        claimNumber: value,
      });

      return;
    }

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
