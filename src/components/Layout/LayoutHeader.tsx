"use client";

import { Layout } from "antd";
import Logo from "@/src/components/Logo";
import { SiteNavBar, UserNavBar, DrawerNavBar } from "@/src/components/NavBar";
const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header
      style={{
        position: "sticky",
        top: "0",
        backgroundColor: "#ffffff",
        zIndex: "99",
        padding: 0,
      }}
      className="drop-shadow-md"
    >
      <div className="hidden md:flex items-center px-4 sm:px-6 h-full">
        <Logo />
        <div className="flex-1 flex justify-center">
          <SiteNavBar />
        </div>
        <UserNavBar />
      </div>

      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Logo />
        <DrawerNavBar />
      </div>
    </Header>
  );
};

export default LayoutHeader;
