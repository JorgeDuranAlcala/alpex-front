// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Dtos
import accountService from '@/services/accounts/account.service'
import { RootState } from '@/store'
import { IEndorsementState } from '@/types/apps/endorsementTypes'

const initialState: IEndorsementState = {
  data: {
    initialized: false,
    reason: '',
    type: '',
    idEndorsementType: 0,
    idAccount: 0,
    information: {},
    discounts: [],
    securities: [],
    securitiesTotal: [],
    installments: [],
    sublimits: []
  }
}

export const fetchAccountById = createAsyncThunk('appEndorsement/fetchAccountById', async (_, { getState }) => {
  const state = getState() as RootState
  const idAccount = state.accounts.formsData?.form1?.id

  if (idAccount) {
    const data = await accountService.getAccountById(idAccount)

    return data
  }
})

export const appEndorsement = createSlice({
  name: 'appEndorsement',
  initialState,
  reducers: {
    updateEndorsement: (state, { payload }) => {
      state.data = { ...state.data, ...payload }
    },
    resetEndorsement: state => {
      state.data = initialState.data
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccountById.fulfilled, (state, action) => {
      const accountData = action.payload
      if (accountData) {
        const information = accountData.informations[accountData.informations.length - 1]
        const discounts = accountData.discounts
        const securities = accountData.securities
        const securitiesTotal = accountData.securitiesTotal
        const installments = accountData.installments
        const sublimits = accountData.sublimits

        state.data.idAccount = accountData.id

        // Filling account forms
        state.data.information = {
          ...information,
          idLineOfBussines: information?.idLineOfBussines?.id,
          idCountry: information?.idCountry?.id,
          idBroker: information?.idBroker?.id,
          idCedant: information?.idCedant?.id,
          idRiskActivity: information?.idRiskActivity?.id,
          idTypeOfLimit: information?.idTypeOfLimit?.id,
          idCurrency: information?.idCurrency?.id,
          idBrokerContact: information?.idBrokerContact?.id,
          idCedantContact: information?.idCedantContact?.id,
          idEconomicSector: information?.idEconomicSector?.id,
          idLeadUnderwriter: information?.idLeadUnderwriter?.id,
          idTechnicalAssistant: information?.idTechnicalAssistant?.id,
          idUnderwriter: information?.idUnderwriter?.id
        }

        state.data.discounts = discounts.map(disccount => {
          return {
            ...disccount,
            percentage: Number(disccount.percentage),
            amount: Number(disccount.amount)
          }
        })

        state.data.securities = securities.map(security => {
          const securityDiscounts = security.discounts

          return {
            ...security,
            netPremiumAt100: Number(security.netPremiumAt100),
            share: Number(security.share),
            dynamicCommission: Number(security.dynamicCommission),
            frontingFee: Number(security.frontingFee),
            netReinsurancePremium: Number(security.netReinsurancePremium),
            taxes: Number(security.taxes),
            reinsuranceBrokerage: Number(security.reinsuranceBrokerage),
            receivedNetPremium: Number(security.receivedNetPremium),
            distributedNetPremium: Number(security.distributedNetPremium),
            difference: Number(security.difference),
            grossPremiumPerShare: Number(security.grossPremiumPerShare),
            consecutive: Number(security.consecutive),
            discounts:
              securityDiscounts.length > 0
                ? securityDiscounts.map(securityDiscount => {
                    return {
                      ...securityDiscount,
                      percentage: Number(securityDiscount.percentage),
                      amount: Number(securityDiscount.amount)
                    }
                  })
                : []
          }
        })

        state.data.securitiesTotal = securitiesTotal.map(securityTotal => {
          return {
            ...securityTotal,
            receivedNetPremium: Number(securityTotal.receivedNetPremium),
            distributedNetPremium: Number(securityTotal.distributedNetPremium),
            difference: Number(securityTotal.difference)
          }
        })

        state.data.installments = installments.map(installment => {
          return {
            ...installment,
            balanceDue: Number(installment.balanceDue),
            settlementDueDate: new Date(installment.settlementDueDate + 'T00:00:00.678Z')
          }
        })

        state.data.sublimits = sublimits
      }
    })
    builder.addCase(fetchAccountById.pending, state => {
      state.data = {
        ...state.data,
        information: {},
        discounts: [],
        securities: [],
        securitiesTotal: [],
        installments: [],
        sublimits: []
      }
    })
  }
})

export const { updateEndorsement, resetEndorsement } = appEndorsement.actions

export default appEndorsement.reducer
