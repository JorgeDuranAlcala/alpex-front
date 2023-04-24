// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import accountsService from 'src/services/accounts/accounts.service'
import { IAccounts } from 'src/types/apps/accountsTypes'

export const fetchAccounts = createAsyncThunk('appAccounts/fetchAccounts', async () => {
  const response: any = await new Promise(res => setTimeout(async () => res(await accountsService.getAccounts()), 3000))

  return response
})
const initialState: IAccounts = {
  accounts: [],
  loading: false,
  filters: []
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
            return { ...item, value: payload.value }
          }

          return item
        })
      }
    },
    deleteAccountFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload
      state.loading = false
    })
    builder.addCase(fetchAccounts.pending, state => {
      state.accounts = []
      state.loading = true
    })
  }
})

export const { handleAccountFilter, deleteAccountFilter } = appAccountsSlice.actions

export default appAccountsSlice.reducer
