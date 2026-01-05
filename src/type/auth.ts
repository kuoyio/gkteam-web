export type DeviceType = "WEB" | "APP";

export interface LoginRequest {
  email: string;
  password: string;
  device: DeviceType;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}
