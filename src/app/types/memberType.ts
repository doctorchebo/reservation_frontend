export interface Member {
  id: number;
  businessId: number;
  userId: number;
  firstName: string;
  lastName: string;
  title: string;
  phoneNumber: number;
  isActive: boolean;
  addressId: number;
  created: number;
  modified: number;
}

interface MemberPatchRequest {
  memberId: number;
}
export interface MemberPatchFirstNameRequest extends MemberPatchRequest {
  firstName: string;
}
export interface MemberPatchLastNameRequest extends MemberPatchRequest {
  lastName: string;
}
export interface MemberPatchAddressRequest extends MemberPatchRequest {
  addressId: number;
}
export interface MemberPatchPhoneNumberRequest extends MemberPatchRequest {
  phoneNumber: string;
}
export interface MemberPatchTitleRequest extends MemberPatchRequest {
  title: string;
}
export interface MemberPatchAddressRequest extends MemberPatchRequest {
  addressId: number;
}
