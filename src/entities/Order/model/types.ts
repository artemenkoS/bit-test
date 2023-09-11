export interface OrderDto {
  source_time: string; // Формат времени ГГГГММДДччммсс
  addresses: {
    address: string;
    lat: number;
    lon: number;
  }[];
  crew_id?: number;
}

export interface OrderData {
  source_time: string;
  addresses: [
    {
      address: string;
      lat: number;
      lon: number;
    },
  ];
  crew_id: number;
}

type AddressComponents = {
  kind: string;
  name: string;
}[];

export interface GeoObject {
  metaDataProperty: {
    GeocoderMetaData: {
      precision: string;
      text: string;
      kind: string;
      Address: {
        country_code: string;
        formatted: string;
        Components: AddressComponents;
      };
      AddressDetails: {
        Country: {
          AddressLine: string;
          CountryNameCode: string;
          CountryName: string;
          AdministrativeArea?: {
            AdministrativeAreaName: string;
            Locality?: {
              LocalityName: string;
              Thoroughfare?: {
                ThoroughfareName: string;
                Premise?: {
                  PremiseNumber: string;
                };
              };
            };
          };
        };
      };
    };
  };
  name: string;
  description: string;
  boundedBy?: {
    Envelope: {
      lowerCorner: string;
      upperCorner: string;
    };
  };
  uri?: string;
  Point?: {
    pos: string;
  };
}

interface GeoObjectCollection {
  metaDataProperty: {
    GeocoderResponseMetaData: {
      Point: {
        pos: string;
      };
      request: string;
      results: string;
      found: string;
    };
  };
  featureMember: {
    GeoObject: GeoObject;
  }[];
}

export interface GeocoderResponse {
  response: {
    GeoObjectCollection: GeoObjectCollection;
  };
}
