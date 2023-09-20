// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import InstallmentService from '@/services/accounts/installments.service'
import { IInstallmentState } from 'src/types/apps/installmentsTypes'

const initialState: IInstallmentState = {
  accounts: [],
  loading: false,
  filters: [],
  info: {
    count: 0,
    page: 1,
    take: 10,
    pages: 0,
    next: '',
    prev: ''
  }
}

export const fetchInstallments = createAsyncThunk(
  'appInstallmentsState/fetchInstallments',
  async (state: IInstallmentState = initialState) => {
    const data = await InstallmentService.filterInstallment({ ...state })

    return data
  }
)

export const fetchInstallmentsTemporal = createAsyncThunk(
  'appInstallmentsState/fetchInstallmentsTemporal',
  async () => {
    const data = await InstallmentService.filterInstallment({ ...initialState, info: { ...initialState.info } })

    return data
  }
)

export const appInstallmentsSlice = createSlice({
  name: 'appInstallmentsState',
  initialState,
  reducers: {
    handleInstallmentsFilter: (state, { payload }) => {
      if (!state.filters.find(item => item.type === payload.type)) {
        state.filters.push({ ...payload })
        state.info.page = 1
      } else {
        state.filters = state.filters.map(item => {
          if (item.type === payload.type) {
            return { ...item, value: payload.value, text: payload.text }
          }

          return item
        })
      }
    },

    deleteInstallmentsFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
    },
    resetInstallmentsFilter: state => {
      state.filters = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchInstallments.fulfilled, (state, action) => {
      state.loading = false
      state.accounts = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchInstallments.pending, state => {
      state.accounts = []
      state.loading = true
    })

    builder.addCase(fetchInstallmentsTemporal.fulfilled, (state, action) => {
      state.loading = false
      state.accounts = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(appInstallmentsSlice.actions.handleInstallmentsFilter, state => {
      state.accounts = []
    })
  }
})

export const { handleInstallmentsFilter, deleteInstallmentsFilter, resetInstallmentsFilter } =
  appInstallmentsSlice.actions

export default appInstallmentsSlice.reducer
