export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserProfileRequest {
  name: string;
}

export interface UpdateUserEmailRequest {
  email: string;
  otp: string;
}
