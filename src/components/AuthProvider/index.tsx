"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";
import { getUserProfile } from "@/src/api/user";
import { setUserProfile, setLoading } from "@/src/store/slices/userSlice";

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { userProfile } = useAppSelector((state) => state.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoginPage = pathname === "/login";
      const token = LocalStorageUtil.get<string>("token");

      if (isLoginPage) {
        if (token) {
          setIsReady(true);
          router.replace("/");
          return;
        }
        setIsReady(true);
        return;
      }

      if (!token) {
        router.replace("/login");
        return;
      }

      if (userProfile) {
        setIsReady(true);
        return;
      }

      try {
        dispatch(setLoading(true));
        const profile = await getUserProfile();
        dispatch(setUserProfile(profile));
        setIsReady(true);
      } catch (error) {
        console.error("获取用户信息失败:", error);
        LocalStorageUtil.remove("token");
        router.replace("/login");
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [pathname, dispatch, router, userProfile]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthChecker>{children}</AuthChecker>
    </Provider>
  );
};

export default AuthProvider;

