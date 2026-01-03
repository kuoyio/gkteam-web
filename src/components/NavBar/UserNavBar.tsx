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
import { logout } from "@/src/api";
import CookieUtil from "@/src/lib/util/cookie-util";

export const UserNavBarItems = [
  {
    key: "/user",
    label: "个人中心",
    icon: <UserOutlined />,
    children: [
      { key: "/user/profile", label: "账号信息", icon: <ProfileOutlined /> },
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
  const isLoggedIn = typeof window !== "undefined" && CookieUtil.isLoggedIn();

  const navItems = useMemo(() => {
    return isLoggedIn ? UserNavBarItems : LoginNavBarItems;
  }, [isLoggedIn]);

  const handleClickNavBarItem = useCallback(
    async ({ key }: { key: string }) => {
      if (key === "/logout") {
        await logout();
        router.push("/login");
        return;
      }
      router.push(key);
    },
    [router]
  );

  return (
    <nav>
      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
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
