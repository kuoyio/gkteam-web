"use client";

import { Menu } from "antd";
import { useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CalculatorOutlined,
  FileTextOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export const SiteNavBarItems = [
  {
    key: "/note/169332126339173300",
    label: "知识笔记",
    icon: <ReadOutlined />,
  },
  {
    key: "/question",
    label: "真题题库",
    icon: <QuestionCircleOutlined />,
  },
  {
    key: "/tool",
    label: "练习工具",
    icon: <ToolOutlined />,
    children: [
      {
        key: "/tool/calculation-practice",
        label: "速算练习",
        icon: <CalculatorOutlined />,
      },
    ],
  },
  {
    key: "/site",
    label: "网站相关",
    icon: <InfoCircleOutlined />,
    children: [
      {
        key: "/site/privacy",
        label: "隐私政策",
        icon: <SafetyCertificateOutlined />,
      },
      {
        key: "/site/terms",
        label: "服务协议",
        icon: <FileTextOutlined />,
      },
      {
        key: "/site/changelog",
        label: "更新日志",
        icon: <HistoryOutlined />,
      },
    ],
  },
];

const SiteNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const selectedKey = useMemo(() => {
    return pathname;
  }, [pathname]);

  const handleClickNavBarItem = useCallback(
    ({ key }: { key: string }) => {
      router.push(key);
    },
    [router],
  );

  return (
    <nav>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={SiteNavBarItems}
        onClick={handleClickNavBarItem}
        theme="light"
        style={{ border: "none", justifyContent: "center" }}
        disabledOverflow={true}
      />
    </nav>
  );
};

export default SiteNavBar;
