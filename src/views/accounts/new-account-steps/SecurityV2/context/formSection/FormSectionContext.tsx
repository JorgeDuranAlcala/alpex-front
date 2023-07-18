import { ReinsuranceCompanyBinderDto } from "@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto";
import { RetroCedantContactDto } from "@/services/catalogs/dtos/retroCedantContact.dto";
import { createContext } from "react";


interface FormSectionContextProps {
  binders: ReinsuranceCompanyBinderDto[];
  retroCedantContacts: RetroCedantContactDto[];
  updateBinders: (binders: ReinsuranceCompanyBinderDto[]) => void;
  updateIdRetroCedant: (id: number | null) => void;
}

export const FormSectionContext = createContext({} as FormSectionContextProps);
