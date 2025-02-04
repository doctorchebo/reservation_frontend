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

export interface LogoutRequest {
  refreshToken: string;
}
export interface AuthenticationResponse {
  authenticationToken: string;
  refreshToken: string;
  email: string;
  expiresAt: number;
}

export interface RefreshTokenRequest {
  email: string;
  refreshToken: string;
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
export interface AuthErrorSimple {
  timestamp: number;
  status: number;
  error: string;
  path: "";
}