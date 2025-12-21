"use client";

import { Layout } from "antd";
import Logo from "@/src/components/Logo/logo";
import NavBar from "@/src/components/NavBar";
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
      <div className="flex items-center justify-between px-4 sm:px-6">
        <Logo />
        <NavBar />
      </div>
    </Header>
  );
};

export default LayoutHeader;
