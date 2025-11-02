import HttpClient from "@/src/lib/http-client";
import { LoginRequest } from "@/src/type";

export const login = async (loginRequest: LoginRequest) => {
  return await HttpClient.post<string>("/auth/login", loginRequest, {
    isNeedToken: false,
  });
};
