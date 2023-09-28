// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

// ** Reducers

import brokerTracker from '@/store/apps/installments/brokerTracker'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import accounts from 'src/store/apps/accounts'
import stepFormSlice from 'src/store/apps/accounts/stepFormsSlice'
import calendar from 'src/store/apps/calendar'
import brokerContacts from 'src/store/apps/catalogs/brokerContacts'
import brokers from 'src/store/apps/catalogs/brokers'
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import endorsement from 'src/store/apps/endorsement'
import installments from 'src/store/apps/installments'
import invoice from 'src/store/apps/invoice'
import permissions from 'src/store/apps/permissions'
import user from 'src/store/apps/user'
import users from 'src/store/apps/users'
import multiTabButtonsSlice from '../layouts/components/multiTabButtons/store/MultiTabButtonSlice'
import properties from './apps/properties'
import uiUserSlice from './apps/user/uiUserSlice'

export const store = configureStore({
  reducer: {
    user,
    uiUserSlice,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    accounts,
    users,
    brokers,
    brokerContacts,
    properties,
    multiTabButtonsSlice,
    stepFormSlice,
    endorsement,
    installments,
    brokerTracker
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
