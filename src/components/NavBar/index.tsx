import { Button, Drawer, Menu } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/src/store/hooks";
import { logout } from "@/src/api";
import useScreen from "@/src/hook/useScreen";

const NavBarItems = [
  {
    key: "/",
    label: "主页",
    icon: <HomeOutlined />,
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile } = useAppSelector((state) => state.user);
  const screen = useScreen();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedKey = useMemo(() => {
    return pathname;
  }, [pathname]);

  const getUserNavBarItem = useCallback(() => {
    return userProfile
      ? {
          key: "/user",
          label: userProfile.name,
          icon: <UserOutlined />,
          children: [
            { key: "/profile", label: "个人中心", icon: <ProfileOutlined /> },
            { key: "/logout", label: "退出登录", icon: <LogoutOutlined /> },
          ],
        }
      : {
          key: "/login",
          label: "登录",
          icon: <LoginOutlined />,
        };
  }, [userProfile]);

  const navItems = useMemo(() => {
    return [...NavBarItems, getUserNavBarItem()];
  }, [getUserNavBarItem]);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleClickNavBarItem = useCallback(
    async ({ key }: { key: string }) => {
      if (key === "/logout") {
        await logout();
        router.push("/login");
        return;
      }
      if (screen.isMobile) {
        setDrawerVisible(false);
      }
      router.push(key);
    },
    [router, screen],
  );

  if (!mounted) {
    return null;
  }

  if (screen.isMobile) {
    return (
      <nav>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          size="large"
        />
        <Drawer
          width={300}
          styles={{
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
  }

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

export default NavBar;
