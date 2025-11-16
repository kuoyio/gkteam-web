import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      className="!min-h-[calc(100vh-64px-64px)]"
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      {children}
    </Content>
  );
};

export default LayoutContent;
