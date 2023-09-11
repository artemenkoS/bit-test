import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { OrderDto } from '../../Order/model/types';
import { Driver, DriverDto } from './types';

export const driversApi = createApi({
  reducerPath: 'driversApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getDrivers: builder.mutation<Driver[], OrderDto>({
      query: (body) => ({
        url: '/drivers',
        method: 'POST',
        body,
      }),
      transformResponse: (rawResult: DriverDto) => {
        return rawResult.data.crews_info.sort((a, b) => a.distance - b.distance);
      },
    }),
  }),
});

export const { useGetDriversMutation } = driversApi;
