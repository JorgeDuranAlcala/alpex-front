

import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact';
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto';
import { ReactNode, useState } from 'react';
import { FormSectionContext } from './FormSectionContext';

export const FormSectionProvider = ({ children }: { children: ReactNode }) => {


  const { retroCedantContacts, setIdRetroCedant } = useGetAllByIdRetroCedant()

  const [binders, setBinders] = useState<ReinsuranceCompanyBinderDto[]>([]);

  const updateBinders = (binders: ReinsuranceCompanyBinderDto[]) => {
    setBinders(binders);
  }

  const updateIdRetroCedant = (id: number | null) => {
    setIdRetroCedant(id)
  }

  return (
    <FormSectionContext.Provider value={{
      binders,
      retroCedantContacts,
      updateBinders,
      updateIdRetroCedant
    }}>
      {children}
    </FormSectionContext.Provider>
  )
}
