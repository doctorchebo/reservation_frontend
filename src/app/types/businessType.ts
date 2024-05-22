import { Address } from "./addressType";
import { Category } from "./categoryType";
import { Image } from "./imageType";

export interface Business {
  id: number;
  name: string;
  ownerId: number;
  categories: Category[];
  addresses: Address[];
  images: Image[];
  created: number;
}
