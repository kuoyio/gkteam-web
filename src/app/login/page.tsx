"use client";
import LoginForm from "@/src/app/login/components/LoginForm";
import Logo from "@/src/components/Logo/logo";
import { useEffect } from "react";
import { clearUserProfile } from "@/src/store/slices/userSlice";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";

export default function LoginPage() {
  useEffect(() => {
    LocalStorageUtil.remove("token");
    clearUserProfile();
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-light-blue/20">
        <div className="flex flex-col justify-center items-center shadow-2xl rounded-b-xl h-[350] w-[450] p-8 gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Logo />
            <span className="text-sm text-dark-grey text-center">
              欢迎来到小K的公考训练营
            </span>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
