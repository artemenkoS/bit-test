export interface Driver {
  crew_id: number;
  car_mark: string;
  car_model: string;
  car_color: string;
  car_number: string;
  driver_name: string;
  driver_phone: string;
  lat: number;
  lon: number;
  distance: number;
}

export interface DriverDto {
  code: number;
  descr: string;
  data: { crews_info: Driver[] };
}
