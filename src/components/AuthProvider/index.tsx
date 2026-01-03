"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import CookieUtil from "@/src/lib/util/cookie-util";

const PUBLIC_ROUTES = ["/", "/login", "/site/privacy", "/site/terms", "/site/changelog"];

const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

const emptySubscribe = () => () => {};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted) return;

    const hasToken = CookieUtil.isLoggedIn();

    if (!hasToken && !isPublicRoute(pathname)) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
      return;
    }

    if (hasToken && pathname === "/login") {
      router.replace("/user/profile");
    }
  }, [mounted, pathname, router]);

  if (!mounted) return null;

  return <>{children}</>;
};

export default AuthProvider;
