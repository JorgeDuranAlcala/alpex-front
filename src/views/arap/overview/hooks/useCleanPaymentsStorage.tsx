import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMasterFiltersStorage } from "./useMasterFiltersStorage";


export const useCleanPaymentsStorage = () => {
   const router = useRouter()
   const {cleanMasterFiltersSelctors} = useMasterFiltersStorage();

  const handeRouteChangeStart = (path: string) => {
    if (!path.includes('/arap/overview/')) {
      cleanMasterFiltersSelctors();
    }
  }
  
  useEffect(() => {
    
    router.events.on('routeChangeStart', handeRouteChangeStart);
    
    return () => {
      router.events.off('routeChangeStart', handeRouteChangeStart);
    }
  }, [])
}