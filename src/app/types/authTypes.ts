export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  authenticationToken: string;
  refreshToken: string;
  username: string;
  expiresAt: number;
}

export interface FieldErrors {
  [key: string]: string[];
}

export interface AuthError {
  timestamp: number;
  status: number;
  errors: FieldErrors;
  path: "";
}
