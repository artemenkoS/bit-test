import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AddressState {
  address: string;
  coords: number[] | null;
  isValid: boolean;
}

const initialState: AddressState = {
  address: '',
  coords: null,
  isValid: true,
};

const addressSlice = createSlice({
  name: 'addressSlice',
  initialState,
  reducers: {
    setValues(state, action: PayloadAction<Partial<AddressState>>) {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { setValues } = addressSlice.actions;
export default addressSlice.reducer;
