
import { ReactNode, useState } from "react";
import { Filter } from "../../_commons/interfaces/Grid";
import { receivables_mock } from "../../mocks/receivables_mock";
import { ReceivableFilters } from "../interfaces/ReceivableFilters";
import { ReceivableGrid } from '../interfaces/ReceivableGrid';
import { ReceivableContext } from './ReceivableContext';



export const ReceivableProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [receivableGrid, setReceivableGrid] = useState<ReceivableGrid | null>(null);



  const loadReceivableGrid = (filters: ReceivableFilters) => {
    setIsLoading(true);

    console.log('filters', filters);

    // Todo: reemplazar este timeout por el servicio que se implementará
    setTimeout(() => {

      const infoPages = {
        count: receivables_mock.length,
        page: 1,
        take: 10,
        pages: Math.ceil(receivables_mock.length / 10),
        next: null,
        prev: null,
      }

      setReceivableGrid({
        receivableGridList: receivables_mock,
        info: infoPages,
        isLoading: false,
        filters: [],
      });

      setIsLoading(false);
    }, 500);


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
