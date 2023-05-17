// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import accountsService from 'src/services/accounts/account.service'
import { IAccountsState } from 'src/types/apps/accountsTypes'

const initialState: IAccountsState = {
  accounts: [],
  loading: false,
  filters: [],
  current: null,
  formsData: null,

  // formsData: {},
  info: {
    count: 0,
    page: 1,
    take: 10,
    pages: 0,
    next: '',
    prev: ''
  },
  temporalFilters: []
}
export const fetchAccounts = createAsyncThunk(
  'appAccounts/fetchAccounts',
  async (state: IAccountsState = initialState) => {
    const response: any = await new Promise(res =>
      setTimeout(async () => res(await accountsService.getAccounts({ ...state })), 300)
    )

    return response
  }
)

export const fetchAccountsTemporal = createAsyncThunk('appUsersState/fetchUsersTemporal', async () => {
  const data = await accountsService.getAccounts({ ...initialState, info: { ...initialState.info, take: 49 } })

  return data
})

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
      // state.formsData = { ...state.formsData, ...payload }
      // console.log(state.formsData)
      console.log(state, payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      // state.loading = false
      // const account = action.payload.filter((item: any) => {
      //   if (state.filters.length) {
      //     let matchesFilter = true
      //     state.filters.forEach(filter => {
      //       if (!item[filter.type].includes(filter.value)) {
      //         matchesFilter = false
      //       }
      //     })

      //     return matchesFilter
      //   }

      //   return true
      // })
      // state.accounts = account
      state.loading = false
      state.accounts = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchAccounts.pending, state => {
      state.accounts = []
      state.loading = true
    })
    builder.addCase(fetchAccountsTemporal.fulfilled, (state, action) => {
      state.loading = false
      state.temporalFilters = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(appAccountsSlice.actions.handleAccountFilter, state => {
      state.accounts = []
    })
  }
})

export const { handleAccountFilter, deleteAccountFilter, resetAccountFilter, updateFormsData } =
  appAccountsSlice.actions

export default appAccountsSlice.reducer
