import { User } from "./UserType";
import { Address } from "./addressType";
import { Category } from "./categoryType";
import { IFile, Image } from "./imageType";
import { Member } from "./memberType";
import { Service } from "./serviceType";

export interface Business {
  id: number;
  name: string;
  owner: User;
  categories: Category[];
  addresses: Address[];
  images: Image[];
  members: Member[];
  services: Service[];
  reservationCount: number;
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
export interface BusinessPatchImagesRequest {
  businessId: number;
  files : IFile[],
}

export interface BusinessCreateRequest {
  name: string;
  categoryIds: number[];
}
