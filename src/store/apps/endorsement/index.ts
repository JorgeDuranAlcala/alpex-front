// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports

// ** Dtos
import { IEndorsementState } from '@/types/apps/endorsementTypes'

const initialState: IEndorsementState = {
  data: {
    active: false,
    reason: '',
    type: '',
    idEndorsementType: 0,
    idAccount: 0,
    information: {},
    securities: [],
    securitiesTotal: [],
    installments: [],
    sublimits: []
  }
}

export const appEndorsement = createSlice({
  name: 'appEndorsement',
  initialState,
  reducers: {
    updateEndorsement: (state, { payload }) => {
      state.data = { ...state.data, ...payload }
    },
    resetEndorsement: state => {
      state.data = {
        active: false,
        reason: '',
        type: '',
        idEndorsementType: 0,
        idAccount: 0,
        information: {},
        securities: [],
        securitiesTotal: [],
        installments: [],
        sublimits: []
      }
    }
  }
})

export const { updateEndorsement, resetEndorsement } = appEndorsement.actions

export default appEndorsement.reducer
