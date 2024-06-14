export interface Member {
  id: number;
  businessId: number;
  userId: number;
  firstName: string;
  lastName: string;
  title?: string;
  phoneNumber: number;
  isActive: boolean;
  created: number;
  modified: number;
}

export interface PatchMemberFirstNameRequest {
  memberId: number;
  firstName: string;
}
export interface PatchMemberLastNameRequest {
  memberId: number;
  lastName: string;
}
