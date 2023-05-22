// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import BrokerContactsServices from 'src/services/catalogs/broker-contact.service'
import { IBrokerContactsState } from 'src/types/apps/catalogs/brokerContactTypes'

const initialState: IBrokerContactsState = {
  idCBroker: 0,
  brokerContacts: [],
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

export const fetchBrokerContacts = createAsyncThunk(
  'appBrokerContactsState/fetchBrokerContacts',
  async (state: IBrokerContactsState = initialState) => {
    const data = await BrokerContactsServices.getBrokerContactsByIdBroker(state.idCBroker, { ...state })

    return data
  }
)

export const fetchBrokerContactsTemporal = createAsyncThunk(
  'appBrokerContactsState/fetchBrokerContactsTemporal',
  async () => {
    const data = await BrokerContactsServices.getBrokerContactsByIdBroker(initialState.idCBroker, {
      ...initialState,
      info: { ...initialState.info, take: 49 }
    })

    return data
  }
)

export const appBrokerContactsSlice = createSlice({
  name: 'appBrokerContactsState',
  initialState,
  reducers: {
    handleBrokerContactsFilter: (state, { payload }) => {
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
    handleSelectBrokerContact: (state, { payload }) => {
      if (payload !== null)
        state.current = state.brokerContacts.filter((brokerContact: any) => brokerContact.id === payload)[0]
    },
    deleteBrokerContactsFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
    },
    resetBrokerContactsFilter: state => {
      state.filters = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBrokerContacts.fulfilled, (state, action) => {
      state.loading = false
      state.brokerContacts = action.payload.results
      state.info = action.payload.info
      state.idCBroker = action.meta.arg?.idCBroker ? action.meta.arg?.idCBroker : 0
    })
    builder.addCase(fetchBrokerContacts.pending, state => {
      state.brokerContacts = []
      state.loading = true
    })

    builder.addCase(fetchBrokerContactsTemporal.fulfilled, (state, action) => {
      state.loading = false
      state.temporalFilters = action.payload.results
      state.info = action.payload.info
      state.idCBroker = 3
    })
    builder.addCase(appBrokerContactsSlice.actions.handleBrokerContactsFilter, state => {
      state.brokerContacts = []
    })
  }
})

export const {
  handleBrokerContactsFilter,
  handleSelectBrokerContact,
  deleteBrokerContactsFilter,
  resetBrokerContactsFilter
} = appBrokerContactsSlice.actions

export default appBrokerContactsSlice.reducer
