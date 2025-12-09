import { Button, Drawer, Menu } from "antd";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { logout } from "@/src/api";
import { clearUserProfile } from "@/src/store/slices/userSlice";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";

const NavBarItems = [
  {
    key: "/",
    label: "主页",
    icon: <HomeOutlined />,
  },
];

const UserNavBarItems = {
  key: "/user",
  label: "个人中心",
  icon: <UserOutlined />,
  children: [
    { key: "/profile", label: "账号信息", icon: <ProfileOutlined /> },
    { key: "/logout", label: "退出登录", icon: <LogoutOutlined /> },
  ],
};

const LoginNavBarItems = {
  key: "/login",
  label: "登录",
  icon: <LoginOutlined />,
};

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const selectedKey = useMemo(() => {
    return pathname;
  }, [pathname]);

  const getUserNavBarItem = useCallback(() => {
    return userProfile ? UserNavBarItems : LoginNavBarItems;
  }, [userProfile]);

  const navItems = useMemo(() => {
    return [...NavBarItems, getUserNavBarItem()];
  }, [getUserNavBarItem]);

  const handleClickNavBarItem = useCallback(
    async ({ key }: { key: string }) => {
      if (key === "/logout") {
        await logout();
        dispatch(clearUserProfile());
        LocalStorageUtil.remove("token");
        router.push("/login");
        return;
      }
      setDrawerVisible(false);
      router.push(key);
    },
    [router, dispatch],
  );

  return (
    <nav>
      <div className="md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          size="large"
        />
        <Drawer
          size={300}
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
      </div>

      <div className="hidden md:block">
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={navItems}
          onClick={handleClickNavBarItem}
          theme="light"
          style={{ border: "none" }}
          disabledOverflow={true}
        />
      </div>
    </nav>
  );
};

export default NavBar;
