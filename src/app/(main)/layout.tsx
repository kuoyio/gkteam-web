"use client";
import { Layout } from "antd";
import LayoutHeader from "@/src/components/Layout/LayoutHeader";
import LayoutContent from "@/src/components/Layout/LayoutContent";
import LayoutFooter from "@/src/components/Layout/LayoutFooter";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className="min-h-screen">
      <LayoutHeader />
      <LayoutContent>
        <section className="max-w-[1200px] mx-auto p-4">{children}</section>
      </LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}
