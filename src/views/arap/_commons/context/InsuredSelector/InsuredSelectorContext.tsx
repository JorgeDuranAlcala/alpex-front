import { createContext } from 'react';
import { AccountingStructure } from '../../interfaces/AccountingStructure';
import { InsuredBy } from '../../interfaces/InsuredBy.type';
import { InsuredOption } from '../../interfaces/InsuredOption';
import { PaymentInstallment } from '../../interfaces/PaymentInstallment';

// TODO : Interface Temporal
export interface TEMP_AccountingStructure extends AccountingStructure {
  insuredId: number;
  insuredName: string;
}

// TODO : Interface Temporal
export interface TEMP_PaymentInstallment {
  insuredId: number;
  paymentInstallments: PaymentInstallment[]
}


interface InsuredSelectorContextProps {
  isLoading: boolean
  insuredOptions: InsuredOption[]
  selectedInsuredId: number | null
  loadInsureds: (by: InsuredBy) => void
  handleOnChangeInsured: (id: number) => void


  // ! INIT implementación temporal
  TEMP_accountingStructures: TEMP_AccountingStructure[]
  TEMP_loadAccountingStructures: (accountingStructures: TEMP_AccountingStructure[]) => void

  TEMP_paymentInstallments: TEMP_PaymentInstallment[]
  TEMP_loadPaymentInstallments: (paymentInstallments: TEMP_PaymentInstallment[]) => void
  
  // ! END implementación temporal

}

export const InsuredSelectorContext = createContext<InsuredSelectorContextProps>({} as InsuredSelectorContextProps)
