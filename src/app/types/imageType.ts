export interface Image {
  id: number;
  businessId: number;
  url: string;
  created: number;
  modified: number | null;
}

export interface IFile {
  id?: number | null;
  url?: string | null;
  file: File;
}
