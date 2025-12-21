"use client";

import { Card, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ProfileOutlined } from "@ant-design/icons";

export default function UserMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/user/profile",
      icon: <ProfileOutlined />,
      label: "账号信息",
    },
  ];

  return (
    <Card
      styles={{
        body: {
          padding: "8px",
        },
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
        style={{ border: "none" }}
      />
    </Card>
  );
}
