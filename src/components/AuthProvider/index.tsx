"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";
import { getUserProfile } from "@/src/api/user";
import { setUserProfile } from "@/src/store/slices/userSlice";
import { message } from "antd";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/site/privacy",
  "/site/terms",
  "/site/changelog",
];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? LocalStorageUtil.get("token") : null;
  const { userProfile } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        dispatch(setUserProfile(user));
      } catch (e) {
        message.error((e as Error).message);
        router.replace("/login");
      }
    };

    const initialize = async () => {
      const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

      if (!token) {
        if (isPublicRoute) return;
        router.replace("/login");
        return;
      }

      if (pathname === "/login") {
        router.replace("/");
        return;
      }

      if (!userProfile) {
        await fetchUserProfile();
      }
    };

    initialize();
  }, [dispatch, pathname, router, token, userProfile]);

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthGuard>{children}</AuthGuard>
    </Provider>
  );
};

export default AuthProvider;
