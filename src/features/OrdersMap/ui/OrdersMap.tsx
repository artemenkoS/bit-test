import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import axios from 'axios';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';

import { setValues } from '@/entities/Address/model/slice';
import { Driver, setSelectedDriver } from '@/entities/Driver/model';
import { GeocoderResponse } from '@/entities/Order/model/types';
import { getAddressString, getAddressUrl, getInitCoords } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';

interface OrdersMapProps {
  drivers?: Driver[];
}

const PLACEMARK_CONFIGS = {
  passengerValidAddress: { preset: 'islands#yellowIcon' },
  passengerInvalidAddress: { preset: 'islands#redStretchyIcon' },
  driver: { preset: 'islands#greenAutoIcon' },
  selectedDriver: { preset: 'islands#darkGreenAutoIcon' },
};

export const OrdersMap: FC<OrdersMapProps> = ({ drivers }) => {
  const dispatch = useAppDispatch();
  const initCoords = getInitCoords();

  const addressState = useAppSelector((state) => state.address);
  const selectedDriver = useAppSelector((state) => state.selectedDriver);

  useEffect(() => {
    if (!addressState.coords) {
      return;
    }

    axios
      .get(getAddressUrl({ geocode: addressState.coords.toString() }))
      .then((res) => {
        const result: GeocoderResponse = res.data;
        const checkedAddress = getAddressString(result.response.GeoObjectCollection.featureMember[0]?.GeoObject);

        if (checkedAddress) {
          dispatch(setValues({ address: checkedAddress, isValid: true }));
        } else {
          throw new Error('isValid');
        }
      })
      .catch((e) => {
        if (e?.message !== 'isValid') {
          toast('Что-то пошло не так!');
        }
        dispatch(setValues({ address: '', isValid: false }));
        dispatch(setSelectedDriver(null));
      });
  }, [addressState.coords]);

  const handlePassengerCoordinatesChange = (e: { get: (name: string) => number[] }) => {
    dispatch(setValues({ coords: e.get('coords') }));
  };

  const handleDriverClick = (driver: Driver) => () => {
    dispatch(setSelectedDriver(driver));
  };

  return (
    <YMaps query={{ coordorder: 'longlat' }}>
      <Map
        height="100%"
        state={{ center: addressState.coords ?? initCoords.coords, zoom: 15 }}
        width="100%"
        onClick={handlePassengerCoordinatesChange}
      >
        {addressState.coords && (
          <Placemark
            geometry={addressState.coords}
            options={
              !addressState.isValid
                ? PLACEMARK_CONFIGS.passengerInvalidAddress
                : PLACEMARK_CONFIGS.passengerValidAddress
            }
            properties={{ iconContent: !addressState.isValid ? 'Адрес не найден!' : '' }}
          />
        )}

        {drivers?.map((driver) => (
          <Placemark
            geometry={[driver.lon, driver.lat]}
            key={driver.crew_id}
            options={
              driver.crew_id === selectedDriver.value?.crew_id
                ? PLACEMARK_CONFIGS.selectedDriver
                : PLACEMARK_CONFIGS.driver
            }
            onClick={handleDriverClick(driver)}
          />
        ))}
      </Map>
    </YMaps>
  );
};
