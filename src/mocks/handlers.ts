import { getDistance } from 'geolib';
import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { OrderDto } from '@/entities/Order/model/types';

const drivers = [
  {
    crew_id: 1,
    car_mark: 'Toyota',
    car_model: 'Camry',
    car_color: 'серебристый',
    car_number: 'А456ВС',
    driver_name: 'Букейханов',
    driver_phone: '1234',
    lat: 56.848593,
    lon: 53.211489,
  },
  {
    crew_id: 2,
    car_mark: 'Nissan',
    car_model: 'Altima',
    car_color: 'черный',
    car_number: 'В789АВ',
    driver_name: 'Петров',
    driver_phone: '5678',
    lat: 56.858246,
    lon: 53.214548,
  },
  {
    crew_id: 3,
    car_mark: 'Honda',
    car_model: 'Accord',
    car_color: 'белый',
    car_number: 'С123СС',
    driver_name: 'Сидоров',
    driver_phone: '9876',
    lat: 56.855125,
    lon: 53.193486,
  },
  {
    crew_id: 4,
    car_mark: 'Kia',
    car_model: 'Optima',
    car_color: 'красный',
    car_number: 'Е456ЕЕ',
    driver_name: 'Козлов',
    driver_phone: '5432',
    lat: 56.82791,
    lon: 53.4343,
  },
  {
    crew_id: 5,
    car_mark: 'Hyundai',
    car_model: 'Sonata',
    car_color: 'серый',
    car_number: 'К789КК',
    driver_name: 'Ильин',
    driver_phone: '4321',
    lat: 56.898964,
    lon: 53.319563,
  },
  {
    crew_id: 6,
    car_mark: 'Ford',
    car_model: 'Focus',
    car_color: 'синий',
    car_number: 'М456ММ',
    driver_name: 'Смирнов',
    driver_phone: '6543',
    lat: 56.874056,
    lon: 53.231133,
  },
  {
    crew_id: 7,
    car_mark: 'Chevrolet',
    car_model: 'Cruze',
    car_color: 'зеленый',
    car_number: 'О123ОО',
    driver_name: 'Андреев',
    driver_phone: '7890',
    lat: 56.854689,
    lon: 53.207831,
  },
  {
    crew_id: 8,
    car_mark: 'Volkswagen',
    car_model: 'Passat',
    car_color: 'серый',
    car_number: 'Т789ТТ',
    driver_name: 'Морозов',
    driver_phone: '8901',
    lat: 56.85859,
    lon: 53.220964,
  },
  {
    crew_id: 9,
    car_mark: 'Skoda',
    car_model: 'Octavia',
    car_color: 'серый',
    car_number: 'Т783ТТ',
    driver_name: 'Антонов',
    driver_phone: '8901',
    lat: 56.837231,
    lon: 53.233635,
  },
  {
    crew_id: 10,
    car_mark: 'Skoda',
    car_model: 'Rapid',
    car_color: 'серый',
    car_number: 'Т589АТ',
    driver_name: 'Михайлов',
    driver_phone: '8901',
    lat: 56.833117,
    lon: 53.211838,
  },
];

const calculateDistance = (clientLat: number, clientLon: number, driverLat: number, driverLon: number) => {
  return getDistance({ latitude: clientLat, longitude: clientLon }, { latitude: driverLat, longitude: driverLon });
};

export const handlers = [
  rest.post<OrderDto>('/drivers', (req, res, ctx) => {
    const { addresses } = req.body;

    const driversWithDistance = drivers.map((driver) => {
      const driverDistance = calculateDistance(addresses[0].lat, addresses[0].lon, driver.lat, driver.lon);

      return {
        ...driver,
        distance: driverDistance,
      };
    });

    const response = {
      code: 200,
      descr: 'OK',
      data: {
        crews_info: driversWithDistance,
      },
    };

    return res(ctx.delay(2000), ctx.status(200), ctx.json(response));
  }),
  rest.post<OrderDto>('/order', (_req, res, ctx) => {
    const response = {
      code: 200,
      descr: 'Заказ успешно создан!',
      data: { order_id: nanoid() },
    };

    return res(ctx.delay(500), ctx.status(200), ctx.json(response));
  }),
];
