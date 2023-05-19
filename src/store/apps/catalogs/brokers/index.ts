// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import BrokersServices from 'src/services/catalogs/broker.service'
import { IBrokersState } from 'src/types/apps/catalogs/brokerTypes'

const initialState: IBrokersState = {
  brokers: [],
  loading: false,
  current: null,
  filters: [],
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

export const fetchBrokers = createAsyncThunk(
  'appBrokersState/fetchBrokers',
  async (state: IBrokersState = initialState) => {
    const data = await BrokersServices.getBrokers({ ...state })

    return data
  }
)

export const fetchBrokersTemporal = createAsyncThunk('appBrokersState/fetchBrokersTemporal', async () => {
  const data = await BrokersServices.getBrokers({ ...initialState, info: { ...initialState.info, take: 49 } })

  return data
})

export const appBrokersSlice = createSlice({
  name: 'appBrokersState',
  initialState,
  reducers: {
    handleBrokersFilter: (state, { payload }) => {
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
    handleSelectBroker: (state, { payload }) => {
      if (payload !== null) state.current = state.brokers.filter((broker: any) => broker.id === payload)[0]
    },
    deleteBrokersFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
    },
    resetBrokersFilter: state => {
      state.filters = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBrokers.fulfilled, (state, action) => {
      state.loading = false
      state.brokers = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchBrokers.pending, state => {
      state.brokers = []
      state.loading = true
    })

    builder.addCase(fetchBrokersTemporal.fulfilled, (state, action) => {
      state.loading = false
      state.temporalFilters = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(appBrokersSlice.actions.handleBrokersFilter, state => {
      state.brokers = []
    })
  }
})

export const { handleBrokersFilter, handleSelectBroker, deleteBrokersFilter, resetBrokersFilter } =
  appBrokersSlice.actions

export default appBrokersSlice.reducer
