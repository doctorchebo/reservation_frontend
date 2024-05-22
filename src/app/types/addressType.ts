import { Geolocation } from "./geolocationType";

export interface Address {
  id: number;
  businessId: number;
  geolocation: Geolocation;
  name: string;
  isMainAddress: boolean;
  created: number;
  modified: number;
}
