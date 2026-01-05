"use client";

import React, {
  Suspense,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CookieUtil from "@/src/lib/util/cookie-util";
import { refreshToken } from "@/src/api/auth";

const PUBLIC_ROUTES = [
  "/",
  "/register",
  "/site/privacy",
  "/site/terms",
  "/site/changelog",
];

const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const emptySubscribe = () => () => {};

const AuthProviderInner = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted) return;

    const tryRefresh = async () => {
      try {
        await refreshToken();
        return true;
      } catch {
        return false;
      }
    };

    const tryRefreshSilent = async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        return !data.code;
      } catch {
        return false;
      }
    };

    const checkAuth = async () => {
      const isLoginPage = pathname === "/login";

      if (isLoginPage) {
        if (CookieUtil.isLoggedIn() || (await tryRefreshSilent())) {
          const redirect = searchParams.get("redirect") || "/user/profile";
          router.replace(redirect);
        } else {
          setIsChecking(false);
        }
        return;
      }

      if (isPublicRoute(pathname)) {
        setIsChecking(false);
        return;
      }

      if (CookieUtil.isLoggedIn() || (await tryRefresh())) {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [mounted, pathname, searchParams, router]);

  if (!mounted || isChecking) return null;

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={null}>
    <AuthProviderInner>{children}</AuthProviderInner>
  </Suspense>
);

export default AuthProvider;
