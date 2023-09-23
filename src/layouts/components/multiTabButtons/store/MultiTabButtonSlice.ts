import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { BackButtonProps, TabButton } from '../interfaces/types'
import { deactivateAllTabButtons } from '../utils/deactivateAllTabButtons'

export interface MultiTabButtonsState {
  baseLink: string
  backButton: BackButtonProps
  tabButtons: TabButton[]
}

const initialState: MultiTabButtonsState = {
  baseLink: '/',
  backButton: {
    text: '',
    isShow: false
  },
  tabButtons: []
}

export const multiTabButtonsSlice = createSlice({
  name: 'multiTabButtons',
  initialState,
  reducers: {
    setMultiTabBaseLink: (state, action: PayloadAction<string>) => {
      state.baseLink = action.payload
    },

    setBackTabButtonProps: (state, action: PayloadAction<BackButtonProps>) => {
      state.backButton = action.payload

      // * If the back button is not shown, then "desactive" all tab buttons
      if (!action.payload.isShow) {
        const updatedTabButtons = deactivateAllTabButtons(state.tabButtons)
        state.tabButtons = updatedTabButtons
      }
    },
    addTabButton: (state, action: PayloadAction<TabButton>) => {
      const foundItem = state.tabButtons.filter(tabButton => tabButton.text === action.payload.text)

      if (foundItem.length > 0) {
        const index = state.tabButtons.indexOf(foundItem[0])
        state.tabButtons[index] = action.payload
      } else {
        const updatedTabButtons = deactivateAllTabButtons(state.tabButtons)
        updatedTabButtons.push(action.payload)
        state.tabButtons = updatedTabButtons
      }

      state.backButton.isShow = true
    },
    removeTabButtonByIndex: (state, action: PayloadAction<number>) => {
      state.tabButtons.splice(action.payload, 1)
    },
    removeTabButtonByText: (state, action: PayloadAction<string>) => {
      const foundItem = state.tabButtons.filter(tabButton => tabButton.text === action.payload)
      if (foundItem.length > 0) {
        const index = state.tabButtons.indexOf(foundItem[0])
        state.tabButtons.splice(index, 1)
      }
    },
    activateTabButtonByIndex: (state, action: PayloadAction<number>) => {
      const updatedTabButtons = deactivateAllTabButtons(state.tabButtons, action.payload)
      state.tabButtons = updatedTabButtons
      state.backButton.isShow = true
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setMultiTabBaseLink,
  setBackTabButtonProps,
  addTabButton,
  removeTabButtonByIndex,
  activateTabButtonByIndex,
  removeTabButtonByText
} = multiTabButtonsSlice.actions

export default multiTabButtonsSlice.reducer
