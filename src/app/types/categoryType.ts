import { IOption } from "./option";

export interface Category extends IOption{
  id: number;
  name: string;
  imageUrl: string | undefined;
}

export interface CategoryOption {
  id: number;
  name: string;
}