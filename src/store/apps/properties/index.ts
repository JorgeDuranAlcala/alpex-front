// ** Redux Imports
import { RootState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { IPropertiesState } from '@/types/apps/propertiesTypes'
import PropertiesService from 'src/services/dynamic-data/properties.mock-service'

const initialState: IPropertiesState = {
  properties: [],
  loading: false,
  filters: [],
  current: null,
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

export const fetchProperties = createAsyncThunk('appProperties/fetchProperties', async (page: number, { getState }) => {
  const state = (getState() as RootState).properties
  const formatedFilters = []
  const rawFilters = state.filters

  if (rawFilters && rawFilters.length > 0) {
    for (const rawFilter of rawFilters) {
          formatedFilters.push(rawFilter)
    }
  }

  const data = await PropertiesService.getProperties({
    ...state,
    filters: formatedFilters,
    info: { ...state.info, page }
  })

  return data
})

export const appPropertiesSlice = createSlice({
  name: 'appProperties',
  initialState,
  reducers: {
    handlePropertyFilter: (state, { payload }) => {
      if (!state.filters.find(item => item.type === payload.type)) { // if filter doesnt exsits, add it
        state.filters = [...state.filters, { ...payload }]
        state.info.page = 1
      } else {
        state.filters = state.filters.map(item => {
          if (item.type === payload.type) { // if filter already exist, update the filter
            return { ...item, value: payload.value, text: payload.text, subtype: payload.subtype }
          }

          return item
        })
      }
    },
    deletePropertyFilter: (state, { payload }) => {
      ;(state.filters = state.filters.filter(item => item.type !== payload)),
        (state.info = {
          count: 0,
          page: 1,
          take: 10,
          pages: 0,
          next: '',
          prev: ''
        })
    },
    resetPropertyFilter: state => {
      ;(state.filters = []),
        (state.info = {
          count: 0,
          page: 1,
          take: 10,
          pages: 0,
          next: '',
          prev: ''
        })
    },

  },
  extraReducers: builder => { //  Executes code when a certain case occurs Ex: fetchProperties.fulfilled  || fetchProperties.pending
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      // state.loading = false
      // const account = action.payload.results.filter((item: any) => {
      //   if (state.filters.length) {
      //     let matchesFilter = true
      //     state.filters.forEach(filter => {
      //       if (!formatStatus(item.idAccountStatus[filter.type]).includes(filter.value)) {
      //         matchesFilter = false
      //       }
      //     })

      //     return matchesFilter
      //   }

      //   return true
      // })
      // state.accounts = account
      // state.info = action.payload.info

      state.loading = false
      state.properties = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchProperties.pending, state => {
      state.properties = []
      state.loading = true
    })
    builder.addCase(appPropertiesSlice.actions.handlePropertyFilter, (state, action) => {
      state.filters = [...state.filters, { ...action.payload }]
      state.info.page = 1
    })
  }
})

export const { handlePropertyFilter, deletePropertyFilter, resetPropertyFilter} =
  appPropertiesSlice.actions

export default appPropertiesSlice.reducer
