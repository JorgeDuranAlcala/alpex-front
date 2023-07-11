import { FormInformation, FormSecurity, SecurityDto } from '@/services/accounts/dtos/security.dto';
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto';
import { RetroCedantDto } from '@/services/catalogs/dtos/RetroCedantDto';
import { CountryDto } from '@/services/catalogs/dtos/country.dto';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { calculateSecurities } from '../utils/calculateSecurities';


export interface Security extends SecurityDto {
  originalNetOrGrossPremium: number;
  actualNetOrGrossPremium: number;
  isShowRetroCedant?: boolean;
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

export interface GetDatas {
  countries: CountryDto[];
  retroCedants: RetroCedantDto[];
  availableReinsurens: ReinsuranceCompanyDto[];
}

export interface SecurityState {
  allFormData: FormSecurity;
  information: Information;
  securities: Security[];
  companiesSelected: number[];
  activeView: number;
  hasSecondView: boolean;
  getDatas: GetDatas;

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
  getDatas: {
    countries: [],
    retroCedants: [],
    availableReinsurens: []
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

      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };
      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = calculatedSecurities.allFormData;
      state.hasSecondView = true;
    },
    createSecondView: (state) => {
      const tempSecurities = state.securities.map((security) => ({
        ...security,
        originalNetOrGrossPremium: security.netPremiumAt100,
        view: 2

      }));

      state.securities = tempSecurities;
      state.activeView = 2;
      state.hasSecondView = true;
    },

    deleteSecondView: (state) => {

      const tempSecurities = state.securities.map((security) => ({
        ...security,
        view: 1,
        netPremiumAt100: security.originalNetOrGrossPremium,
      }));
      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };
      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = calculatedSecurities.allFormData;
      state.hasSecondView = false;
    },

    switchView: (state, action: PayloadAction<{ toView: number }>) => {

      const tempSecurities = state.securities.map((security) => ({
        ...security,
        view: action.payload.toView,
        ...(action.payload.toView === 1 ? {
          netPremiumAt100: security.actualNetOrGrossPremium,
        } : {
          actualNetOrGrossPremium: security.netPremiumAt100,
          netPremiumAt100: security.originalNetOrGrossPremium,
        }),
      }));

      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };
      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = calculatedSecurities.allFormData;

      state.activeView = action.payload.toView;
    },

    updateInformation: (state, action: PayloadAction<Information>) => {
      state.information = { ...action.payload };

      // debugger;
    },

    updateAllFormData: (state, action: PayloadAction<FormSecurity>) => {
      state.allFormData = action.payload;

    },

    updateSecuritiesAtIndex: (state, action: PayloadAction<{ index: number, security: SecurityDto }>) => {
      const tempSecurities = [...state.securities];
      tempSecurities[action.payload.index] = {
        ...state.securities[action.payload.index],
        ...action.payload.security as Security
      };

      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };
      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = calculatedSecurities.allFormData;
    },

    updateAllSecurities: (state, action: PayloadAction<{ securities: SecurityDto[] }>) => {
      const tempSecurities = action.payload.securities as Security[];
      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };
      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = calculatedSecurities.allFormData;

      // debugger;
    },

    updateAllSecuritiesAndAllFormData: (state, action: PayloadAction<{ securities: SecurityDto[], allFormData: FormSecurity }>) => {
      const tempSecurities = action.payload.securities as Security[];
      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };

      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = action.payload.allFormData;




    },

    deleteSecurityByIndex: (state, action: PayloadAction<{ index: number }>) => {
      const tempSecurities = [...state.securities];
      tempSecurities.splice(action.payload.index, 1);
      const calculatedSecurities = { ...calculateSecurities({ securities: tempSecurities, information: state.information }) };

      state.companiesSelected = calculatedSecurities.companiesSelected;
      state.securities = calculatedSecurities.securities;
      state.allFormData = calculatedSecurities.allFormData;
      state.activeView = 1;

    },

    updateCountries: (state, action: PayloadAction<{ countries: CountryDto[] }>) => {
      state.getDatas.countries = action.payload.countries;
    },

    updateRetroCedants: (state, action: PayloadAction<{ retroCedants: RetroCedantDto[] }>) => {
      state.getDatas.retroCedants = action.payload.retroCedants;
    },

    updateAvailableReinsurers: (state, action: PayloadAction<{ availableReinsurens: ReinsuranceCompanyDto[] }>) => {
      state.getDatas.availableReinsurens = action.payload.availableReinsurens;
    }

  },
});

// Action creators are generated for each case reducer function
export const {
  createNewSecurity,
  createSecondView,
  switchView,
  deleteSecondView,
  updateInformation,
  updateSecuritiesAtIndex,
  updateAllSecurities,
  deleteSecurityByIndex,
  updateCountries,
  updateRetroCedants,
  updateAvailableReinsurers,
  updateAllFormData,
  updateAllSecuritiesAndAllFormData
} = securitySlice.actions;

export default securitySlice.reducer;
