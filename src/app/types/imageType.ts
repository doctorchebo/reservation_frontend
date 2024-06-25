export interface Image {
  id: number;
  businessId: number;
  url: string;
  created: number;
  modified: number | null;
}

export interface IFile {
  id: number;
  url: string;
  file: File;
}
