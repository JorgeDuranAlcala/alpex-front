// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import InstallmentService from '@/services/accounts/installments.service'
import { IBrokerTrackerState } from 'src/types/apps/installmentsTypes'

const initialState: IBrokerTrackerState = {
  accounts: [],
  loading: false,
  filters: [],
  info: {
    count: 0,
    page: 1,
    take: 10,
    pages: 0,
    next: '',
    prev: '',
    idBroker: ''
  }
}

export const fetchBrokerTrackerTemporal = createAsyncThunk(
  'appInstallmentsState/fetchBrokerTrackerTemporal',
  async () => {
    const data = await InstallmentService.filterBrokerTracker({ ...initialState, info: { ...initialState.info } })

    return data
  }
)

export const fetchBrokerTracker = createAsyncThunk(
  'appInstallmentsState/fetchBrokerTracker',
  async (state: IBrokerTrackerState = initialState) => {
    const data = await InstallmentService.filterBrokerTracker({ ...state })

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
    builder.addCase(fetchBrokerTracker.fulfilled, (state, action) => {
      state.loading = false
      state.accounts = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchBrokerTracker.pending, state => {
      state.accounts = []
      state.loading = true
    })

    builder.addCase(fetchBrokerTrackerTemporal.fulfilled, (state, action) => {
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
