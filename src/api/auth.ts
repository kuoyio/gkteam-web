import HttpClient from "@/src/lib/http-client";
import { LoginRequest } from "@/src/type";

export const login = (loginRequest: LoginRequest) =>
  HttpClient.post<null>("/auth/login", loginRequest);

export const logout = () => HttpClient.post<null>("/auth/logout");

export const refreshToken = () => HttpClient.post<null>("/auth/refresh");
