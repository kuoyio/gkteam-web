"use client";

import { Layout } from "antd";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import VisualSection from "../components/VisualSection";
import TextEasterEgg from "@/src/components/TextEasterEgg";
import Link from "next/link";

const { Content } = Layout;

export default function Home() {
  const [count, setCount] = useState(2179);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout className="h-screen bg-white overflow-hidden">
      <Content className="relative flex flex-col overflow-hidden h-full">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-ant-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-ant-blue-100 rounded-full blur-[120px] opacity-40" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-8">
            <HeroSection />
            <div className="hidden lg:block flex-1">
              <VisualSection communityCount={count} />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full text-center pb-8 space-y-4 px-6">
          <TextEasterEgg />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 opacity-40 hover:opacity-100 transition-opacity duration-300">
            <span className="text-[12px] text-ant-grey-500 font-medium tracking-wider">
              © {new Date().getFullYear()} GKTeam 公考小分队版权所有
            </span>
            <Link
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              className="text-[12px] !text-ant-grey-500 hover:!text-ant-blue-500 transition-colors"
            >
              粤ICP备2020111542号-6
            </Link>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
