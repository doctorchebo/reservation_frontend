export interface Service {
  id: number;
  name: string;
  categoryIds: number[];
  durationIds: number[];
  businessId: number;
  addressIds: number[];
  priceIds: number[];
  created: number;
  modified: number;
}

interface ServicePatchRequest {
  serviceId: string;
}
export interface ServicePatchNameRequest extends ServicePatchRequest {
  name: string;
}

export interface ServicePatchDurationsRequest extends ServicePatchRequest {
  durationIds: number[];
}
export interface ServicePatchAddressesRequest extends ServicePatchRequest {
  addressIds: number[];
}
export interface ServicePatchPriceRequest extends ServicePatchRequest {
  businessId: number;
  serviceId: string;
  price: number;
}

export interface ServiceCreateRequest {
  businessId?: number;
  name: string;
  price: number;
  addressIds: number[];
  durationIds: number[];
}
