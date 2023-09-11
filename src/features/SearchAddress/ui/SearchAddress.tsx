import TextField from '@mui/material/TextField';
import axios from 'axios';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';

import { getErrorText } from '@/entities/Address/lib';
import { setValues } from '@/entities/Address/model';
import { setSelectedDriver } from '@/entities/Driver/model';
import { GeocoderResponse } from '@/entities/Order/model/types';
import { getAddressString, getAddressUrl, getInitCoords, isAddressValid } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';

export const SearchAddress = () => {
  const initCoords = getInitCoords();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.address);

  const [address, setAddress] = useState('');

  useEffect(() => {
    setAddress(state.address);
  }, [state.address]);

  const getCoordsFromAddress = debounce((address: string) => {
    if (!address) {
      dispatch(setValues({ coords: null, isValid: false }));
      dispatch(setSelectedDriver(null));
      return;
    }

    axios.get<GeocoderResponse>(getAddressUrl({ geocode: `${initCoords.city} ${address}` })).then((res) => {
      const result: GeocoderResponse = res.data;

      const geoObject = result.response.GeoObjectCollection.featureMember[0]?.GeoObject;
      const isValidAddress = isAddressValid(geoObject);
      const coords = geoObject?.Point?.pos.split(' ').map((v) => parseFloat(v));
      const address = getAddressString(geoObject);

      if (isValidAddress && coords && address) {
        dispatch(setValues({ address, coords, isValid: true }));
        setAddress(address);
      } else {
        dispatch(setValues({ coords: null, isValid: false }));
        dispatch(setSelectedDriver(null));
      }
    });
  }, 500);

  const handleChangeAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
    getCoordsFromAddress(e.currentTarget.value);
  }, []);

  return (
    <TextField
      fullWidth
      error={!state.isValid}
      label="Откуда"
      helperText={getErrorText(address, state.isValid)}
      value={address}
      onChange={handleChangeAddress}
    />
  );
};
