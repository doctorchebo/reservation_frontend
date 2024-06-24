export interface Image {
  id: number;
  businessId: number;
  url: string;
  created: number;
  modified: number | null;
}

export interface IFile {
  file: File;
  id: number;
  url: string;
}
