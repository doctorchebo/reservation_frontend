import { Dayjs } from "dayjs";
import { User } from "./UserType";
import { Business } from "./businessType";
import { Member } from "./memberType";
import { Service } from "./serviceType";

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

export interface ReservationDetailed {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  user: User;
  business: Business;
  service: Service;
  member: Member;
  created: number;
  modified: number;
}

export interface ReservationRequest {
  name: string;
  startTime: Dayjs;
  userId: number;
  businessId: number;
  serviceId: string;
  memberId: string;
}
