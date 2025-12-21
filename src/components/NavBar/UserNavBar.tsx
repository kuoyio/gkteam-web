"use client";

import { Menu } from "antd";
import { useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { logout } from "@/src/api";
import { clearUserProfile } from "@/src/store/slices/userSlice";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";

export const UserNavBarItems = [
  {
    key: "/user",
    label: "个人中心",
    icon: <UserOutlined />,
    children: [
      { key: "/profile", label: "账号信息", icon: <ProfileOutlined /> },
      { key: "/logout", label: "退出登录", icon: <LogoutOutlined /> },
    ],
  },
];

export const LoginNavBarItems = [
  {
    key: "/login",
    label: "用户登录",
    icon: <LoginOutlined />,
  },
];

const UserNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);

  const selectedKey = useMemo(() => {
    return pathname;
  }, [pathname]);

  const navItems = useMemo(() => {
    return userProfile ? UserNavBarItems : LoginNavBarItems;
  }, [userProfile]);

  const handleClickNavBarItem = useCallback(
    async ({ key }: { key: string }) => {
      if (key === "/logout") {
        await logout();
        dispatch(clearUserProfile());
        LocalStorageUtil.remove("token");
        router.push("/login");
        return;
      }
      router.push(key);
    },
    [router, dispatch],
  );

  return (
    <nav>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={navItems}
        onClick={handleClickNavBarItem}
        theme="light"
        style={{ border: "none" }}
        disabledOverflow={true}
      />
    </nav>
  );
};

export default UserNavBar;
