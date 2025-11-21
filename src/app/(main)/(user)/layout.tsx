"use client";

import { Card, Row, Col, Space } from "antd";
import UserInfoCard from "./components/UserInfoCard";
import UserMenu from "./components/UserMenu";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={6} xl={6}>
        <Space className="w-full" direction="vertical">
          <UserInfoCard />
          <UserMenu />
        </Space>
      </Col>
      <Col xs={24} sm={24} md={16} lg={18} xl={18}>
        <Card>{children}</Card>
      </Col>
    </Row>
  );
}
