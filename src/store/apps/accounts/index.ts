// ** Redux Imports
import { RootState } from '@/store'
import { setDateFilterQuery } from '@/utils/formatDates'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import accountsService from 'src/services/accounts/account.service'
import { IAccountsState } from 'src/types/apps/accountsTypes'

const initialState: IAccountsState = {
  accounts: [],
  loading: false,
  filters: [],
  current: null,
  formsData: {},
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

export const fetchAccounts = createAsyncThunk('appAccounts/fetchAccounts', async (page: number, { getState }) => {
  const state = (getState() as RootState).accounts
  const formatedFilters = []
  const rawFilters = state.filters

  if (rawFilters && rawFilters.length > 0) {
    for (const rawFilter of rawFilters) {
      if (rawFilter.type === 'status') {
        formatedFilters.push({
          ...rawFilter,
          value: String(rawFilter.text)
        })
      } else {
        if (rawFilter.type === 'effectiveDate') {
          setDateFilterQuery(rawFilter, formatedFilters, 'effectiveDate')
        } else if (rawFilter.type === 'expirationDate') {
          setDateFilterQuery(rawFilter, formatedFilters, 'expirationDate')
        } else {
          formatedFilters.push(rawFilter)
        }
      }
    }
  }

  const data = await accountsService.getAccounts({
    ...state,
    filters: formatedFilters,
    info: { ...state.info, page }
  })

  return data
})

export const appAccountsSlice = createSlice({
  name: 'appAccounts',
  initialState,
  reducers: {
    handleAccountFilter: (state, { payload }) => {
      if (!state.filters.find(item => item.type === payload.type)) {
        state.filters = [...state.filters, { ...payload }]
        state.info.page = 1
      } else {
        state.filters = state.filters.map(item => {
          if (item.type === payload.type) {
            return { ...item, value: payload.value, text: payload.text, subtype: payload.subtype }
          }

          return item
        })
      }
    },
    deleteAccountFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
      state.info = {
        count: 0,
        page: 1,
        take: 10,
        pages: 0,
        next: '',
        prev: ''
      }
    },
    resetAccountFilter: state => {
      state.filters = []
      state.info = {
        count: 0,
        page: 1,
        take: 10,
        pages: 0,
        next: '',
        prev: ''
      }
    },

    updateFormsData: (state, { payload }) => {
      state.formsData = { ...state.formsData, ...payload }
    },
    updateFormId: (state, action: PayloadAction<{ id: number }>) => {
      let tempDataForm1 = state.formsData.form1
      tempDataForm1 = { ...tempDataForm1, id: action.payload.id }

      state.formsData.form1 = tempDataForm1
    },

    resetFormsData: state => {
      state.formsData = {}
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.loading = false
      state.accounts = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchAccounts.pending, state => {
      state.accounts = []
      state.loading = true
    })
    builder.addCase(appAccountsSlice.actions.handleAccountFilter, (state, action) => {
      state.filters = [...state.filters, { ...action.payload }]
      state.info.page = 1
    })
  }
})

export const { handleAccountFilter, deleteAccountFilter, resetAccountFilter, updateFormsData, updateFormId } =
  appAccountsSlice.actions

export default appAccountsSlice.reducer
