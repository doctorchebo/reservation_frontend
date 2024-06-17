import { Address } from "./addressType";
import { Category } from "./categoryType";
import { Image } from "./imageType";
import { Member } from "./memberType";
import { Service } from "./serviceType";

export interface Business {
  id: number;
  name: string;
  ownerId: number;
  categories: Category[];
  addresses: Address[];
  images: Image[];
  members: Member[];
  services: Service[];
  created: number;
}

export interface BusinessPatchNameRequest {
  businessId: number;
  name: string;
}
export interface BusinessPatchCategoriesRequest {
  businessId: number;
  categoryIds: number[];
}
export interface BusinessPatchMembersRequest {
  businessId: number;
  memberIds: number[];
}
export interface BusinessPatchServicesRequest {
  businessId: number;
  serviceIds: number[];
}
