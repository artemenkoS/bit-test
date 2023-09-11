import { LinearProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useGetDriversMutation } from '@/entities/Driver/model';
import { setSelectedDriver } from '@/entities/Driver/model';
import { CreateOrder } from '@/features/CreateOrder/ui/CreateOrder';
import { DriversList } from '@/features/DriversList/ui/DriversList';
import { OrdersMap } from '@/features/OrdersMap/ui/OrdersMap';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { SOURCE_TIME_FORMAT } from '@/shared/model/const';

import { Layout, MapContainer, MapLayout, Sidebar } from './styled';

export const NewOrderForm = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.address);

  const [getDrivers, drivers] = useGetDriversMutation();

  useEffect(() => {
    const sourceTime = dayjs(new Date()).format(SOURCE_TIME_FORMAT);
    if (address.isValid && address.coords) {
      getDrivers({
        source_time: sourceTime,
        addresses: [{ lon: address.coords[0], lat: address.coords[1], address: address.address }],
      });
      dispatch(setSelectedDriver(null));
    } else {
      drivers.reset();
    }
  }, [address, getDrivers]);

  useEffect(() => {
    if (drivers.data) {
      dispatch(setSelectedDriver(drivers.data[0]));
    }
  }, [drivers.data]);

  /* TODO */
  return (
    <Layout>
      <MapLayout>
        <MapContainer>
          <OrdersMap drivers={drivers.data} />
        </MapContainer>
        <Sidebar>
          {drivers.isLoading && <LinearProgress />}
          {drivers.data && drivers.isSuccess && <DriversList drivers={drivers.data} />}
        </Sidebar>
      </MapLayout>
      <CreateOrder isDisabled={drivers.isLoading} />
    </Layout>
  );
};
