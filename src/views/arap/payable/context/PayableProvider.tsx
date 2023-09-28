
import { ReactNode, useState } from "react";
import { PayableFilters } from "../interfaces/PayableFilters";
import { PayableGrid } from '../interfaces/PayableGrid';
import { PayableContext } from "./PayableContext";

import { Filter } from "../../_commons/interfaces/Grid";
import { payablesAdapter } from "../services/getPayablesAll/frontAdapters/payablesAdapter";
import { payablesFiltersAdapter } from "../services/getPayablesAll/frontAdapters/payablesFiltersAdapter";
import { getPayablesAllService } from "../services/getPayablesAll/getPayablesAllService";

export const PayableProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [payableGrid, setPayableGrid] = useState<PayableGrid | null>(null);

  const loadPayableGrid = async (payableFilters: PayableFilters) => {
    setIsLoading(true);

    const filters = payablesFiltersAdapter(payableFilters)
    const payables = await getPayablesAllService(filters);
    const payablesAdapted = payablesAdapter(payables);

    setPayableGrid({
        payableGridList: payablesAdapted.payableGridList,
        info: payablesAdapted.info,
        isLoading: false,
        filters: [...payablesAdapted.filters],
      });

    setIsLoading(false);

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
