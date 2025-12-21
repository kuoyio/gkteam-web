"use client";

import { Button, Drawer, Menu } from "antd";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { logout } from "@/src/api";
import { clearUserProfile } from "@/src/store/slices/userSlice";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";
import { SiteNavBarItems } from "./SiteNavBar";
import { UserNavBarItems, LoginNavBarItems } from "./UserNavBar";

const DrawerNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const selectedKey = useMemo(() => {
    return pathname;
  }, [pathname]);

  const navItems = useMemo(() => {
    const userItems = userProfile ? UserNavBarItems : LoginNavBarItems;
    return [...SiteNavBarItems, ...userItems];
  }, [userProfile]);

  const handleClickNavBarItem = useCallback(
    async ({ key }: { key: string }) => {
      if (key === "/logout") {
        await logout();
        dispatch(clearUserProfile());
        LocalStorageUtil.remove("token");
        router.push("/login");
        setDrawerVisible(false);
        return;
      }
      setDrawerVisible(false);
      router.push(key);
    },
    [router, dispatch],
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
          selectedKeys={[selectedKey]}
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

