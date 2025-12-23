"use client";

import { Card, Row, Col, Flex } from "antd";
import UserInfoCard from "@/src/app/(main)/user/components/UserInfoCard";
import UserMenu from "@/src/app/(main)/user/components/UserMenu";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <section className="max-w-[1600px] mx-auto">
      <Row gutter={[16, 16]} className="p-4">
        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
          <Flex vertical gap="middle" className="w-full">
            <UserInfoCard />
            <UserMenu />
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={16} lg={18} xl={18}>
          <Card>{children}</Card>
        </Col>
      </Row>
    </section>
  );
}
