import { IUIUserNotificacion, UIUserSliceState } from '@/types/apps/uiUserTypes';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';


const initialState: UIUserSliceState = {
  notification: {
    isOpen: false,
    type: null,
  }
};

export const uiUserSlice = createSlice({
  name: 'uiUserSlice',
  initialState,
  reducers: {
    setUIUserNotification: (state, action: PayloadAction<IUIUserNotificacion>) => {
      state.notification = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUIUserNotification } = uiUserSlice.actions;


export default uiUserSlice.reducer
