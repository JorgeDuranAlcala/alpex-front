// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import UsersServices from 'src/services/users/users.service'
import { IUsersState } from 'src/types/apps/usersTypes'

const initialState: IUsersState = {
  users: [],
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

export const fetchAccounts = createAsyncThunk('appUsersState/fetchUsers', async (state: IUsersState = initialState) => {
  const data = await UsersServices.getUsers({ ...state })

  return data
})

export const fetchAccountsTemporal = createAsyncThunk('appUsersState/fetchUsersTemporal', async () => {
  const data = await UsersServices.getUsers({ ...initialState, info: { ...initialState.info } })

  return data
})

export const appUsersSlice = createSlice({
  name: 'appUsersState',
  initialState,
  reducers: {
    handleUsersFilter: (state, { payload }) => {
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
    handleSelectUser: (state, { payload }) => {
      if (payload !== null) state.current = state.users.filter((user: any) => user.id === payload)[0]
    },
    deleteUsersFilter: (state, { payload }) => {
      state.filters = state.filters.filter(item => item.type !== payload)
    },
    resetUsersFilter: state => {
      state.filters = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(fetchAccounts.pending, state => {
      state.users = []
      state.loading = true
    })

    builder.addCase(fetchAccountsTemporal.fulfilled, (state, action) => {
      state.loading = false
      state.temporalFilters = action.payload.results
      state.info = action.payload.info
    })
    builder.addCase(appUsersSlice.actions.handleUsersFilter, state => {
      state.users = []
    })
  }
})

export const { handleUsersFilter, handleSelectUser, deleteUsersFilter, resetUsersFilter } = appUsersSlice.actions

export default appUsersSlice.reducer
