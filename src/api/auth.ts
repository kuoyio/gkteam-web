import HttpClient from "@/src/lib/http-client";
import { LoginRequest } from "@/src/type";

export const login = async (loginRequest: LoginRequest) => {
  return await HttpClient.post<string>("/auth/login", loginRequest, {
    isNeedToken: false,
  });
};

export const logout = async () => {
  return await HttpClient.post<string>("/auth/logout", null, {
    isNeedToken: true,
  });
};
