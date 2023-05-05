// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import accountsService from 'src/services/accounts/information.service'
import { IAccounts } from 'src/types/apps/accountsTypes'

export const fetchAccounts = createAsyncThunk('appAccounts/fetchAccounts', async () => {
  const response: any = await new Promise(res => setTimeout(async () => res(await accountsService.getAccounts()), 300))

  return response
})
const initialState: IAccounts = {
  accounts: [],
  loading: false,
  filters: [],
  formsData: {}
}
export const appAccountsSlice = createSlice({
  name: 'appAccounts',
  initialState,
  reducers: {
    handleAccountFilter: (state, { payload }) => {
      if (!state.filters.find(item => item.type === payload.type)) state.filters.push({ ...payload })
      else {
        state.filters = state.filters.map(item => {
          if (item.type === payload.type) {
            return { ...item, value: payload.value, text: payload.text }
          }

          return item
        })
      }
    },
    deleteAccountFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
    },
    resetAccountFilter: state => {
      state.filters = []
    },
    updateFormsData: (state, { payload }) => {
      state.formsData = { ...state.formsData, ...payload }
      console.log(state.formsData)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.loading = false
      const account = action.payload.filter((item: any) => {
        if (state.filters.length) {
          let matchesFilter = true
          state.filters.forEach(filter => {
            if (!item[filter.type].includes(filter.value)) {
              matchesFilter = false
            }
          })

          return matchesFilter
        }

        return true
      })
      state.accounts = account
    })
    builder.addCase(fetchAccounts.pending, state => {
      state.accounts = []
      state.loading = true
    })
    builder.addCase(appAccountsSlice.actions.handleAccountFilter, state => {
      state.accounts = []
    })
  }
})

export const { handleAccountFilter, deleteAccountFilter, resetAccountFilter, updateFormsData } =
  appAccountsSlice.actions

export default appAccountsSlice.reducer
