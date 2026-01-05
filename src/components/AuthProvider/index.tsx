"use client";

import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CookieUtil from "@/src/lib/util/cookie-util";
import { isPublicRoute } from "@/src/lib/constants/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  checkAuth: async () => false,
});

export const useAuth = () => useContext(AuthContext);

const emptySubscribe = () => () => {};

const AuthProviderInner = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const tryRefreshSilent = useCallback(async (): Promise<boolean> => {
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
  }, []);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (CookieUtil.isLoggedIn()) {
      setIsLoggedIn(true);
      return true;
    }

    const refreshed = await tryRefreshSilent();
    if (refreshed) {
      setIsLoggedIn(true);
      return true;
    }

    setIsLoggedIn(false);
    return false;
  }, [tryRefreshSilent]);

  useEffect(() => {
    if (!mounted) return;

    const performAuthCheck = async () => {
      const isLoginPage = pathname === "/login";
      const isRegisterPage = pathname === "/register";

      if (isLoginPage || isRegisterPage) {
        const authenticated = await checkAuth();
        if (authenticated) {
          const redirect = searchParams.get("redirect") || "/user/profile";
          router.replace(redirect);
        } else {
          setIsChecking(false);
        }
        return;
      }

      if (isPublicRoute(pathname)) {
        await checkAuth();
        setIsChecking(false);
        return;
      }

      const authenticated = await checkAuth();
      if (authenticated) {
        setIsChecking(false);
      } else {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    performAuthCheck();
  }, [mounted, pathname, searchParams, router, checkAuth]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isLoggedIn,
      isLoading: isChecking,
      checkAuth,
    }),
    [isLoggedIn, isChecking, checkAuth],
  );

  if (!mounted || isChecking) return null;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={null}>
    <AuthProviderInner>{children}</AuthProviderInner>
  </Suspense>
);

export default AuthProvider;
