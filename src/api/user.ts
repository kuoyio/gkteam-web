import HttpClient from "@/src/lib/http-client";
import {
  UpdateUserEmailRequest,
  UpdateUserProfileRequest,
  UserProfileResponse,
} from "@/src/type/user";

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
