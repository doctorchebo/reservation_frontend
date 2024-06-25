import { IFile } from "./imageType";

export interface Category {
  id: number;
  name: string;
  imageUrl: string | undefined;
}

export interface CategoryCreateRequest {
  name: string;
  image: File | undefined;
}
export interface CategoryPatchRequest {
  categoryId: number;
}
export interface CategoryPatchNameRequest extends CategoryPatchRequest {
  name: string;
}
export interface CategoryPatchImageRequest extends CategoryPatchRequest {
  image: File;
}
