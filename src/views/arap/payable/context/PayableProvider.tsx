
import { ReactNode, useState } from "react";
import { PayableFilters } from "../interfaces/PayableFilters";
import { PayableGrid } from '../interfaces/PayableGrid';
import { PayableContext } from "./PayableContext";

import { Filter } from "../../_commons/interfaces/Grid";
import { payables_mock } from "../../mocks/payables_mock";

export const PayableProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [payableGrid, setPayableGrid] = useState<PayableGrid | null>(null);



  const loadPayableGrid = (filters: PayableFilters) => {
    setIsLoading(true);

    console.log('filters', filters);

    // Todo: reemplazar este timeout por el servicio que se implementará
    setTimeout(() => {


      const infoPages = {
        count: payables_mock.length,
        page: 1,
        take: 10,
        pages: Math.ceil(payables_mock.length / 10),
        next: null,
        prev: null,
      }

      setPayableGrid({
        payableGridList: payables_mock,
        info: infoPages,
        isLoading: false,
        filters: [],
      });

      setIsLoading(false);
    }, 500);


  }

  const onChangePage = (page: number) => {

    console.log('onChangePage', page);

    if (!payableGrid) return;

    setPayableGrid({
      ...payableGrid,
      info: {
        ...payableGrid.info,
        page
      },

    })
  }

  const handleChangeFilters = (filters: Filter) => {
    console.log('handleChangeFilters', filters);

    if (!payableGrid) return;
    if (payableGrid.payableGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = payableGrid.filters || [];

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setPayableGrid({
        ...payableGrid,
        filters: [...tempFilters, filters]
      });

      setIsLoading(false);
    }, 500);

  }

  const handleDeleteFilters = (type: string) => {

    if (!payableGrid) return;
    if (payableGrid.payableGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = payableGrid.filters.filter(filterItem => filterItem.type !== type);


    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setPayableGrid({
        ...payableGrid,
        filters: [...tempFilters]
      });
      setIsLoading(false);
    }, 500);

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
