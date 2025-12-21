"use client";

import { Layout } from "antd";
import {
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
} from "@/src/components/Layout";
import TextEasterEgg from "@/src/components/TextEasterEgg";

export default function Home() {
  const renderBanner = () => {
    return (
      <div className="bg-ant-blue-50">
        <div className="flex flex-col gap-y-4 pt-24 pb-24 text-center">
          <h1 className="text-ant-blue-500 text-4xl font-bold">公考小分队</h1>
          <h2 className="text-3xl font-bold">欢迎来到小K的公考训练营</h2>
          <TextEasterEgg />
        </div>
      </div>
    );
  };

  return (
    <Layout className="min-h-screen">
      <LayoutHeader />
      <LayoutContent>
        <section className="flex flex-col">{renderBanner()}</section>
      </LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}
