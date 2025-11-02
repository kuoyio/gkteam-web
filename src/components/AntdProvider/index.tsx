"use client";

import { App, ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { ReactNode } from "react";
import zhCN from "antd/locale/zh_CN";

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          fontFamily: "'Maple Mono', monospace",
        },
      }}
    >
      <App>{children}</App>;
    </ConfigProvider>
  );
};

export default AntdProvider;
