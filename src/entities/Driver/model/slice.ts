import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Driver } from './types';

interface SelectedDriver {
  value: Driver | null;
}

const initialState: SelectedDriver = {
  value: null,
};

const selectedDriverSlice = createSlice({
  name: 'selectedDriver',
  initialState,
  reducers: {
    setSelectedDriver(state, action: PayloadAction<Driver | null>) {
      state.value = action.payload;
    },
  },
});

export const { setSelectedDriver } = selectedDriverSlice.actions;
export default selectedDriverSlice.reducer;
