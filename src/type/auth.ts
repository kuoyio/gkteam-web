export interface LoginRequest {
  email: string;
  otp: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
