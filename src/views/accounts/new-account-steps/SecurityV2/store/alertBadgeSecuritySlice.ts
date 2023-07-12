import { IAlert } from '@/views/custom/alerts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAlert = {
  message: '',
  theme: 'success',
  open: false,
  status: 'error'
};

export const alertBadgeSecuritySlice = createSlice({
  name: 'alertBadgeSecurity',
  initialState,
  reducers: {

    setAlertBadgeSecurity: (state, action: PayloadAction<IAlert>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlertBadgeSecurity } = alertBadgeSecuritySlice.actions;



export default alertBadgeSecuritySlice.reducer
