
import { ReactNode, useRef, useState } from "react";
import { Filter } from "../../_commons/interfaces/Grid";
import { ReceivableFilters } from "../interfaces/ReceivableFilters";
import { ReceivableGrid } from '../interfaces/ReceivableGrid';
import { receivablesAdapter } from "../services/getReceivablesAll/frontAdapters/receivablesAdapter";
import { receivablesFiltersAdapter } from "../services/getReceivablesAll/frontAdapters/receivablesFiltersAdapter";
import { getReceivablesAllService } from "../services/getReceivablesAll/getReceivablesAllService";
import { extractReceivableTableFilters } from "../utils/extractReceivableTableFilters";
import { ReceivableContext } from './ReceivableContext';



export const ReceivableProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [receivableGrid, setReceivableGrid] = useState<ReceivableGrid | null>(null);

  const pageRef = useRef(1);
  const tempFiltersRef = useRef<Filter[]>([]);
  const tempQueryFiltersRef = useRef<ReceivableFilters | null>(null);


  const loadReceivableGrid = async (receivableFilters: ReceivableFilters) => {
    setIsLoading(true);

    console.log('filters', receivableFilters);

    tempQueryFiltersRef.current = receivableFilters;
    const queryTabaleFilters = extractReceivableTableFilters(tempFiltersRef.current);
    const filtersToSend = receivablesFiltersAdapter({
      ...receivableFilters,
      ...queryTabaleFilters
    });

    try {
      
      const receivables = await getReceivablesAllService({
        ...filtersToSend, 
        page: pageRef.current
      });
      const receivablesAdapted = receivablesAdapter(receivables);

      setReceivableGrid({
        receivableGridList: receivablesAdapted.receivableGridList,
        info: receivablesAdapted.info,
        isLoading: false,
          filters: [...receivablesAdapted.filters, ...tempFiltersRef.current],
      });

    } catch (error) {
      console.error(error);
      alert('Error al cargar los pagos')
    }
    
    setIsLoading(false);

  }

  const onChangePage = (page: number) => {

    if (!tempQueryFiltersRef.current) return
    if (!receivableGrid) return

    pageRef.current = page;
    loadReceivableGrid(tempQueryFiltersRef.current);
  }

  const handleChangeFilters = (filters: Filter) => {
    console.log('handleChangeFilters', filters);

    // if (receivableGrid.receivableGridList.length === 0) return;
    if (!receivableGrid) return;
    if (!tempQueryFiltersRef.current) return

    setIsLoading(true);

    let tempFilters: Filter[] = receivableGrid?.filters || [];
    
    tempFilters = receivableGrid?.filters.filter(filterItem => filterItem.type !== filters.type) || []
    
    tempFiltersRef.current = [...tempFilters, filters];
    loadReceivableGrid(tempQueryFiltersRef.current);

  }

  const handleDeleteFilters = (type: string) => {

    if (!receivableGrid) return;
    if (!tempQueryFiltersRef.current) return;

    // if (receivableGrid.receivableGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = receivableGrid.filters.filter(filterItem => filterItem.type !== type);

    tempFiltersRef.current = [...tempFilters];
    loadReceivableGrid(tempQueryFiltersRef.current);

  }

  return (
    <ReceivableContext.Provider value={{
      isLoading,
      receivableGrid,
      loadReceivableGrid,
      onChangePage,
      handleChangeFilters,
      handleDeleteFilters

    }}>
      {children}
    </ReceivableContext.Provider>
  )
}
