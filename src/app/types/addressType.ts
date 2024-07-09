import { Geolocation } from "./geolocationType";
import { IOption } from "./option";

export interface Address extends IOption {
  id: number;
  businessId: number;
  geolocation: Geolocation;
  name: string;
  isMainAddress: boolean;
  created: number;
  modified: number;
}

export interface AddressCreateRequest {
  businessId: number;
  name: string;
  longitude: number;
  latitude: number;
  isMainAddress: boolean;;
}
export interface AddressPatchRequest {
  addressId: number;
}
export interface AddressPatchNameRequest extends AddressPatchRequest {
  name: string;
}
export interface AddressPatchLatitudeRequest extends AddressPatchRequest {
  latitude: number;
}
export interface AddressPatchLongitudeRequest extends AddressPatchRequest {
  longitude: number;
}
export interface AddressPatchIsMainAddressRequest extends AddressPatchRequest {
  businessId: number;
}
