import { FormInformation, FormSecurity, SecurityDto } from '@/services/accounts/dtos/security.dto';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { calculateSecurities } from '../utils/calculateSecurities';


export interface Security extends SecurityDto {
  originalNetOrGrossPremium: number;
  actualNetOrGrossPremium: number;
  isShowRetrocedant?: boolean;
  isShowToggleTaxes?: boolean;
  isTaxesEnabled?: boolean;
  isShowToggleFrontingFee?: boolean;
  isFrontingFeeEnabled?: boolean;
  isTouchedTaxes?: boolean;
  isTouchedTaxesAmount?: boolean;
  isTouchedFrontingFee?: boolean;
  isTouchedFrontingFeeAmount?: boolean;

}

export interface Information extends FormInformation {
  taxes: number;
  taxesP: number;
  frontingFee: number;
  frontingFeeP: number;
}

export interface SecurityState {
  allFormData: FormSecurity;
  information: Information;
  securities: Security[];
  companiesSelected: number[];
  activeView: number;
  hasSecondView: boolean;

}

const initialState: SecurityState = {
  allFormData: {
    formData: [],
    recievedNetPremium: 0,
    distribuitedNetPremium: 0,
    diference: 0
  },
  information: {
    taxes: 0,
    taxesP: 0,
    frontingFee: 0,
    frontingFeeP: 0,
    netPremium: 0,
    grossPremium: 0,
    limit: 0
  },
  securities: [],
  companiesSelected: [],
  activeView: 1,
  hasSecondView: false,
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    createNewSecurity: (state, action: PayloadAction<Security>) => {
      const tempSecurities = [...state.securities];
      tempSecurities.push(action.payload);
      state = {
        ...state,
        hasSecondView: true,
        ...calculateSecurities({ securities: tempSecurities, information: state.information })
      }
    },
    createSecondView: (state) => {
      state.securities = state.securities.map((security) => ({
        ...security,
        originalNetOrGrossPremium: security.netPremiumAt100

      }));
    },

    deleteSecondView: (state) => {

      const tempSecurities = state.securities.map((security) => ({
        ...security,
        view: 1,
        netPremiumAt100: security.originalNetOrGrossPremium,
      }));

      state = {
        ...state,
        hasSecondView: false,
        ...calculateSecurities({ securities: tempSecurities, information: state.information })
      }
    },

    switchView: (state, action: PayloadAction<{ toView: number }>) => {

      const tempSecurities = state.securities.map((security) => ({
        ...security,
        view: action.payload.toView,
        ...(action.payload.toView === 1 ? {
          netPremiumAt100: security.actualNetOrGrossPremium,
          activeView: 1
        } : {
          actualNetOrGrossPremium: security.netPremiumAt100,
          netPremiumAt100: security.originalNetOrGrossPremium,
          activeView: 2
        }),
      }));

      state = {
        ...state,
        ...calculateSecurities({ securities: tempSecurities, information: state.information })
      }
    },

    updateInformation: (state, action: PayloadAction<Information>) => {
      state.information = action.payload;
    },
    updateSecuritiesAtIndex: (state, action: PayloadAction<{ index: number, securities: SecurityDto }>) => {
      const tempSecurities = [...state.securities];
      tempSecurities[action.payload.index] = {
        ...state.securities,
        ...action.payload.securities as Security
      };
      state = {
        ...state,
        ...calculateSecurities({ securities: tempSecurities, information: state.information })
      }
    },

    updateAllSecurities: (state, action: PayloadAction<{ securities: SecurityDto[] }>) => {
      const tempSecurities = action.payload.securities as Security[];
      state = {
        ...state,
        ...calculateSecurities({ securities: tempSecurities, information: state.information })
      }
    },

    deleteSecurityByIndex: (state, action: PayloadAction<{ index: number }>) => {
      const tempSecurities = [...state.securities];
      tempSecurities.splice(action.payload.index, 1);
      state = {
        ...state,
        ...calculateSecurities({ securities: tempSecurities, information: state.information })
      }
    }

  },
});

// Action creators are generated for each case reducer function
export const { createNewSecurity, createSecondView, switchView, deleteSecondView, updateInformation, updateSecuritiesAtIndex, updateAllSecurities, deleteSecurityByIndex } = securitySlice.actions;

export default securitySlice.reducer;
