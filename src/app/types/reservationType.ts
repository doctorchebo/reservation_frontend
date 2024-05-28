export interface Reservation {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  userId: number;
  businessId: number;
  serviceId: number;
  memberId: number;
  created: number;
  modified: number;
}
