
import { ReactNode, useRef, useState } from "react";
import { PayableFilters } from "../interfaces/PayableFilters";
import { PayableGrid } from '../interfaces/PayableGrid';
import { PayableContext } from "./PayableContext";

import { Filter } from "../../_commons/interfaces/Grid";
import { payablesAdapter } from "../services/getPayablesAll/frontAdapters/payablesAdapter";
import { payablesFiltersAdapter } from "../services/getPayablesAll/frontAdapters/payablesFiltersAdapter";
import { getPayablesAllService } from "../services/getPayablesAll/getPayablesAllService";
import { extractPayableTableFilters } from "../utils/extractPayableTableFilters";

export const PayableProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [payableGrid, setPayableGrid] = useState<PayableGrid | null>(null);

  const pageRef = useRef(1);
  const tempFiltersRef = useRef<Filter[]>([]);
  const tempQueryFiltersRef = useRef<PayableFilters | null>(null);

  const loadPayableGrid = async (payableFilters: PayableFilters) => {
    setIsLoading(true);

    tempQueryFiltersRef.current = payableFilters;
    const queryTabaleFilters = extractPayableTableFilters(tempFiltersRef.current);
    const filtersToSend = payablesFiltersAdapter({
      ...payableFilters,
      ...queryTabaleFilters
    });

    try {
      const payables = await getPayablesAllService({
        ...filtersToSend, 
        page: pageRef.current
      });
      const payablesAdapted = payablesAdapter(payables);
  
      setPayableGrid({
          payableGridList: payablesAdapted.payableGridList,
          info: payablesAdapted.info,
          isLoading: false,
          filters: [...payablesAdapted.filters, ...tempFiltersRef.current],
        });
    } catch (error) {
      console.error(error);

      alert('Error al cargar los pagos')
    }

    setIsLoading(false);

  }

  const onChangePage = (page: number) => {

    if (!tempQueryFiltersRef.current) return
    if (!payableGrid) return

    pageRef.current = page;
    loadPayableGrid(tempQueryFiltersRef.current);
  }

  const handleChangeFilters = (filters: Filter) => {
    console.log('handleChangeFilters', filters);

    // if (payableGrid.payableGridList.length === 0) return;
    if (!payableGrid) return;
    if (!tempQueryFiltersRef.current) return

    setIsLoading(true);

    let tempFilters: Filter[] = payableGrid?.filters || [];
    
    tempFilters = payableGrid?.filters.filter(filterItem => filterItem.type !== filters.type) || []
    
    tempFiltersRef.current = [...tempFilters, filters];
    loadPayableGrid(tempQueryFiltersRef.current);

  }

  const handleDeleteFilters = (type: string) => {

    if (!payableGrid) return;
    if (!tempQueryFiltersRef.current) return;

    // if (payableGrid.payableGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = payableGrid.filters.filter(filterItem => filterItem.type !== type);

    tempFiltersRef.current = [...tempFilters];
    loadPayableGrid(tempQueryFiltersRef.current);

  }

  return (
    <PayableContext.Provider value={{
      isLoading,
      payableGrid,
      loadPayableGrid,
      onChangePage,
      handleChangeFilters,
      handleDeleteFilters
    }}>
      {children}
    </PayableContext.Provider>
  )
}
