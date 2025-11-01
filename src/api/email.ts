import HttpClient from "@/src/lib/http-client";
import { OtpType } from "@/src/type/email";

export const sendOtp = async (email: string, otpType: OtpType) => {
  return HttpClient.post("/email/otp", {
    email,
    otpType,
  });
};
