import { Filter } from "@/views/arap/_commons/interfaces/Grid";
import { followUp_mock } from "@/views/claims/mocks/followUp_mock";
import { ReactNode, useState } from "react";
import { QueryFilters } from '../../interfaces/QueryFilters';
import { FollowUpGrid } from '../../interfaces/followUp/FollowUpGrid';
import { FollowUpContext } from "./FollowUpContext";



export const FollowUpProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followUpGrid, setFollowUpGrid] = useState<FollowUpGrid | null>(null);

  const loadFollowUpGrid = (queryFilters: QueryFilters) => {

    setIsLoading(true);
    console.log('loadPayments by queryFilters', queryFilters);

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {

      const infoPages = {
        count: followUp_mock.length,
        page: 1,
        take: 10,
        pages: Math.ceil(followUp_mock.length / 10),
        next: null,
        prev: null,
      }

      setFollowUpGrid({
        followUpGridList: followUp_mock,
        info: infoPages,
        isLoading: false,
        filters: [],
      });

      setIsLoading(false);
    }, 500)
  }

  const onChangePage = (page: number) => {

    console.log('onChangePage', page);

    if (!followUpGrid) return;

    setFollowUpGrid({
      ...followUpGrid,
      info: {
        ...followUpGrid.info,
        page
      },

    })
  }

  const handleChangeFilters = (filters: Filter) => {
    console.log('handleChangeFilters', filters);

    if (!followUpGrid) return;
    if (followUpGrid.followUpGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = followUpGrid.filters || [];

    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setFollowUpGrid({
        ...followUpGrid,
        filters: [...tempFilters, filters]
      });

      setIsLoading(false);
    }, 500);

  }

  const handleDeleteFilters = (type: string) => {

    if (!followUpGrid) return;
    if (followUpGrid.followUpGridList.length === 0) return;

    setIsLoading(true);

    const tempFilters: Filter[] = followUpGrid.filters.filter(filterItem => filterItem.type !== type);


    // Todo: reemplazar este Timeout por el servicio que se implementará
    setTimeout(() => {
      setFollowUpGrid({
        ...followUpGrid,
        filters: [...tempFilters]
      });
      setIsLoading(false);
    }, 500);

    setFollowUpGrid({
      ...followUpGrid,
      filters: [...tempFilters]
    })
  }

  console.log("Fake data: ", isLoading);


  return (
    <FollowUpContext.Provider value={{
      isLoading,
      followUpGrid,
      loadFollowUpGrid,
      onChangePage,
      handleChangeFilters,
      handleDeleteFilters
    }}>
      {children}
    </FollowUpContext.Provider>
  )
}
