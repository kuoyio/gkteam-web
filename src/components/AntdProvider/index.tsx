"use client";

import { App } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { ReactNode } from "react";

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return <App>{children}</App>;
};

export default AntdProvider;
