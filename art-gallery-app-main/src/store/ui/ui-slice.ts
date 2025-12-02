import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isSnackbarOpen: false,
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setSnackbarOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isSnackbarOpen = payload;
    },

    openDateModal: (state) => {
      state.isDateModalOpen = true;
    },

    closeDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { closeDateModal, openDateModal, setSnackbarOpen } =
  uiSlice.actions;
