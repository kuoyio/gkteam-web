"use client";
import { Layout } from "antd";
import {
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
} from "@/src/components/Layout";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className="min-h-screen">
      <LayoutHeader />
      <LayoutContent>{children}</LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}
