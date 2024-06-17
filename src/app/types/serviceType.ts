export interface Service {
  id: number;
  name: string;
  categoryIds: number[];
  durationIds: number[];
  businessIds: number[];
  created: number;
  modified: number;
}

export interface ServicePatchDurationsRequest {
  serviceId: string;
  durationIds: number[];
}
