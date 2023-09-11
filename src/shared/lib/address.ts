import queryString from 'query-string';

import { GeoObject } from '@/entities/Order/model';

const MAPS_URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${import.meta.env.VITE_API_KEY}`;

export const getAddressUrl = (params: object): string => `${MAPS_URL}&format=json&${queryString.stringify(params)}`;

export const getAddressString = (geoObject?: GeoObject): string => {
  const values = geoObject?.metaDataProperty.GeocoderMetaData.Address.Components;
  if (!Array.isArray(values)) {
    return '';
  }

  const street = values.find((value) => value.kind === 'street');
  const house = values.find((value) => value.kind === 'house');

  if (!street?.name || !house?.name) {
    return '';
  }

  return `${street.name}, ${house.name}`;
};

export const isAddressValid = (geoObject?: GeoObject): boolean =>
  geoObject?.metaDataProperty.GeocoderMetaData.Address.Components.some((el) => el.kind === 'house') ?? false;
