"use client";

import { Button, Drawer, Menu } from "antd";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { logout } from "@/src/api";
import CookieUtil from "@/src/lib/util/cookie-util";
import { SiteNavBarItems } from "./SiteNavBar";
import { UserNavBarItems, LoginNavBarItems } from "./UserNavBar";

const DrawerNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isLoggedIn = typeof window !== "undefined" && CookieUtil.isLoggedIn();

  const navItems = useMemo(() => {
    const userItems = isLoggedIn ? UserNavBarItems : LoginNavBarItems;
    return [...SiteNavBarItems, ...userItems];
  }, [isLoggedIn]);

  const handleClickNavBarItem = useCallback(
    async ({ key }: { key: string }) => {
      if (key === "/logout") {
        await logout();
        router.push("/login");
        setDrawerVisible(false);
        return;
      }
      setDrawerVisible(false);
      router.push(key);
    },
    [router]
  );

  return (
    <nav>
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
        size="large"
      />
      <Drawer
        styles={{
          wrapper: { width: 280 },
          body: { padding: 0 },
        }}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closeIcon={null}
      >
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={navItems}
          onClick={handleClickNavBarItem}
          theme="light"
          className="!border-r-0"
        />
      </Drawer>
    </nav>
  );
};

export default DrawerNavBar;
