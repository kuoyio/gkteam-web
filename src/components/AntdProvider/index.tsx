"use client";

import { App, ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { ReactNode } from "react";
import zhCN from "antd/locale/zh_CN";
import { AntdRegistry } from "@ant-design/nextjs-registry";

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            fontFamily: "'Maple Mono', monospace",
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
