export interface User {
  id: number;
  username: string;
  email: string;
  isEnabled: boolean;
  isSuperUser: boolean;
  created: number;
}
