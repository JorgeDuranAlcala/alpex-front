import { DiscountDto } from '@/services/accounts/dtos/discount.dto';
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto';
import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto';
import type { BasicInfoInterface, PlacementStructure } from '@/views/accounts/new-account-steps/Information/Information';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface stepFormsState {
  [key: string | number]: {
    step: number;
    information: {
      basicInfo: BasicInfoInterface | null;
      placementStructure: PlacementStructure | null;
      discounts: DiscountDto[];
    };
    security: {
      securities: SecurityDto[];
      secondViewSecurities: SecurityDto[];
    },
    paymentWarranty: {
      installments: InstallmentDto[];
    },
    sublimits: {
      sublimits: SublimitDto[];
    }
  }
}

const initialState: stepFormsState = {};

export const stepFormsSlice = createSlice({
  name: 'stepForms',
  initialState,
  reducers: {
    stepForms_updateStep: (state, action: PayloadAction<{ id: string | number, data: number }>) => {

      const isExistsId = state[action.payload.id];

      const newStep = {
        step: action.payload.data,
        ...(isExistsId ? {
          information: state[action.payload.id].information,
          security: state[action.payload.id].security,
          paymentWarranty: state[action.payload.id].paymentWarranty,
          sublimits: state[action.payload.id].sublimits,
        } : {
          information: {
            basicInfo: null,
            placementStructure: null,
            discounts: []
          },
          security: {
            securities: [],
            secondViewSecurities: [],
          },
          paymentWarranty: {
            installments: [],
          },
          sublimits: {
            sublimits: [],
          }
        })
      }

      state[action.payload.id] = newStep;
    },

    stepForms_updateInformationBasicInfo: (state, action: PayloadAction<{ id: string | number, data: BasicInfoInterface }>) => {
      state[action.payload.id].information.basicInfo = action.payload.data;
    },

    stepForms_updateInformationPlacementStructure: (state, action: PayloadAction<{ id: string | number, data: PlacementStructure }>) => {
      state[action.payload.id].information.placementStructure = action.payload.data;
    },

    stepForms_updateInformationDiscounts: (state, action: PayloadAction<{ id: string | number, data: DiscountDto[] }>) => {
      state[action.payload.id].information.discounts = action.payload.data;
    },

    stepForms_updateSecuritySecurities: (state, action: PayloadAction<{ id: string | number, data: SecurityDto[] }>) => {
      state[action.payload.id].security.securities = action.payload.data;
    },

    stepForms_updateSecuritySecondViewSecurities: (state, action: PayloadAction<{ id: string | number, data: SecurityDto[] }>) => {
      state[action.payload.id].security.secondViewSecurities = action.payload.data;
    },

    stepForms_updatePaymentWarrantyInstallments: (state, action: PayloadAction<{ id: string | number, data: InstallmentDto[] }>) => {
      state[action.payload.id].paymentWarranty.installments = action.payload.data;
    },

    stepForms_updateSublimitsSublimits: (state, action: PayloadAction<{ id: string | number, data: SublimitDto[] }>) => {
      state[action.payload.id].sublimits.sublimits = action.payload.data;
    }

  },
});

// Action creators are generated for each case reducer function
export const {
  stepForms_updateStep,
  stepForms_updateInformationBasicInfo,
  stepForms_updateInformationPlacementStructure,
  stepForms_updateInformationDiscounts,
  stepForms_updateSecuritySecurities,
  stepForms_updateSecuritySecondViewSecurities,
  stepForms_updatePaymentWarrantyInstallments,
  stepForms_updateSublimitsSublimits,
} = stepFormsSlice.actions;


export default stepFormsSlice.reducer;
