import { configureStore } from '@reduxjs/toolkit';

import setAddressReducer from '../entities/Address/model/slice';
import { driversApi } from '../entities/Driver/model/api';
import setSelectedDriverReducer from '../entities/Driver/model/slice';

export const store = configureStore({
  reducer: {
    [driversApi.reducerPath]: driversApi.reducer,
    selectedDriver: setSelectedDriverReducer,
    address: setAddressReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(driversApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
