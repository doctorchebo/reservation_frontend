export interface Duration {
  id: number;
  duration: string;
  serviceIds: string[];
  businessId: number;
  created: number;
  modified: number;
}

export interface DurationCreateRequest {
  duration: string;
  businessId: number;
}
