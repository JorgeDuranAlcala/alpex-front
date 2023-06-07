// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

// ** Reducers
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import accounts from 'src/store/apps/accounts'
import calendar from 'src/store/apps/calendar'
import brokerContacts from 'src/store/apps/catalogs/brokerContacts'
import brokers from 'src/store/apps/catalogs/brokers'
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import permissions from 'src/store/apps/permissions'
import user from 'src/store/apps/user'
import users from 'src/store/apps/users'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    accounts,
    users,
    brokers,
    brokerContacts
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
