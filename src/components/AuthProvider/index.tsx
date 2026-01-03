"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import CookieUtil from "@/src/lib/util/cookie-util";
import { refreshToken } from "@/src/api/auth";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/site/privacy",
  "/site/terms",
  "/site/changelog",
];

const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const emptySubscribe = () => () => {};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      if (isPublicRoute(pathname)) {
        setIsChecking(false);
        return;
      }

      if (CookieUtil.isLoggedIn()) {
        if (pathname === "/login") {
          router.replace("/user/profile");
          return;
        }
        setIsChecking(false);
        return;
      }

      try {
        await refreshToken();
        setIsChecking(false);
      } catch {}
    };

    checkAuth();
  }, [mounted, pathname, router]);

  if (!mounted || isChecking) return null;

  return <>{children}</>;
};

export default AuthProvider;
