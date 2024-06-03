export interface Member {
  id: number;
  businessId: number;
  userId: number;
  firstName: string;
  lastName: string;
  title?: string;
  phoneNumber: number;
  created: number;
  modified: number;
}
