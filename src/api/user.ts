import HttpClient from "@/src/lib/http-client";
import {
  UpdateUserEmailRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from "@/src/type/user";
import { ForgotPasswordRequest, RegisterRequest } from "@/src/type/auth";

export const getUserProfile = async () => {
  return await HttpClient.get<UserProfileResponse>("/users/profile");
};

export const updateUserProfile = async (
  updateUserProfileRequest: UpdateUserProfileRequest,
) => {
  return await HttpClient.put<UserProfileResponse>(
    "/users/profile",
    updateUserProfileRequest,
  );
};

export const updateUserEmail = async (
  updateUserEmailRequest: UpdateUserEmailRequest,
) => {
  return await HttpClient.put<UserProfileResponse>(
    "/users/email",
    updateUserEmailRequest,
  );
};

export const register = async (registerRequest: RegisterRequest) => {
  return await HttpClient.post<null>("/users/register", registerRequest);
};

export const forgotPassword = async (
  forgotPasswordRequest: ForgotPasswordRequest,
) => {
  return await HttpClient.post<null>(
    "/users/forgot-password",
    forgotPasswordRequest,
  );
};
