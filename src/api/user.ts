import HttpClient from "@/src/lib/http-client";
import { UserProfileResponse } from "@/src/type/user";

export const getUserProfile = async () => {
  return await HttpClient.get<UserProfileResponse>("/users/profile");
};
