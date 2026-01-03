import type { Metadata } from "next";
import "./globals.css";
import "@/src/assets/scss/antd.scss";
import AntdProvider from "@/src/components/AntdProvider";
import AuthProvider from "@/src/components/AuthProvider";
import StoreProvider from "@/src/components/StoreProvider";
import Loading from "@/src/components/Loading";
import React from "react";

export const metadata: Metadata = {
  title: "公考小分队",
  description: "小K的公考训练营",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <StoreProvider>
          <AuthProvider>
            <AntdProvider>
              {children}
              <Loading />
            </AntdProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
