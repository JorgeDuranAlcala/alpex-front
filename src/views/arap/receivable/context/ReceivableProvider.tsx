
import { ReactNode, useState } from "react";
import { Filter } from "../../_commons/interfaces/Grid";
import { ReceivableFilters } from "../interfaces/ReceivableFilters";
import { ReceivableGrid } from '../interfaces/ReceivableGrid';
import { receivablesAdapter } from "../services/getReceivablesAll/frontAdapters/receivablesAdapter";
import { receivablesFiltersAdapter } from "../services/getReceivablesAll/frontAdapters/receivablesFiltersAdapter";
import { getReceivablesAllService } from "../services/getReceivablesAll/getReceivablesAllService";
import { ReceivableContext } from './ReceivableContext';



export const ReceivableProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [receivableGrid, setReceivableGrid] = useState<ReceivableGrid | null>(null);



  const loadReceivableGrid = async (receivableFilters: ReceivableFilters) => {
    setIsLoading(true);

    console.log('filters', receivableFilters);

    const filters = receivablesFiltersAdapter(receivableFilters);
    const receivables = await getReceivablesAllService(filters);
    const receivablesAdapted = receivablesAdapter(receivables);

    
      setReceivableGrid({
        receivableGridList: receivablesAdapted.receivableGridList,
        info: receivablesAdapted.info,
        isLoading: false,
        filters: [...receivablesAdapted.filters],
      });


      setIsLoading(false);


  }

  const onChangePage = (page: number) => {

    console.log('onChangePage', page);

    if (!receivableGrid) return;

    setReceivableGrid({
      ...receivableGrid,
      info: {
        ...receivableGrid.info,
        page
      },

    })
  }

  const handleChangeFilters = (filters: Filter) => {
    console.log('handleChangeFilters', filters);

    if (!receivableGrid) return;
    if (receivableGrid.receivableGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = receivableGrid.filters || [];

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setReceivableGrid({
        ...receivableGrid,
        filters: [...tempFilters, filters]
      });

      setIsLoading(false);
    }, 500);

  }

  const handleDeleteFilters = (type: string) => {

    if (!receivableGrid) return;
    if (receivableGrid.receivableGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = receivableGrid.filters.filter(filterItem => filterItem.type !== type);


    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setReceivableGrid({
        ...receivableGrid,
        filters: [...tempFilters]
      });
      setIsLoading(false);
    }, 500);

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
