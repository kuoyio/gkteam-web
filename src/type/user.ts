export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserProfileRequest {
  name: string;
}

export interface ResetPasswordRequest {
  currentPassword: string;
  newPassword: string;
}
