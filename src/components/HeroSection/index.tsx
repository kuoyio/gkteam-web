"use client";

import { Button, Typography, Tag } from "antd";
import {
  ArrowRightOutlined,
  RocketOutlined,
  ReadOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Shrikhand } from "next/font/google";
import { useRouter } from "next/navigation";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const { Title } = Typography;

const HeroSection = () => {
  const router = useRouter();

  const handleAction = () => {
    router.push("/user/profile");
  };

  return (
    <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
      <div className="space-y-4">
        <h1
          className={`${shrikhand.className} text-7xl sm:text-8xl text-ant-blue-500 leading-none tracking-tight drop-shadow-sm`}
        >
          GKTeam
        </h1>
        <Title level={2} className="!text-xl !font-bold !text-slate-800 !mt-0">
          公考小分队 · 一个平平无奇的备考社区
        </Title>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Button
          type="primary"
          size="large"
          onClick={handleAction}
          className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold bg-ant-blue-500 hover:bg-ant-blue-600 border-none shadow-xl hover:shadow-ant-blue-200 transition-all duration-300 flex items-center justify-center gap-3"
        >
          进入社区 <ArrowRightOutlined />
        </Button>
      </div>

      <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-6">
        <Tag
          icon={<RocketOutlined />}
          color="blue"
          className="!px-3 !py-1 !rounded-full !text-sm !border-none !bg-slate-100 !text-slate-600"
        >
          系统备考
        </Tag>
        <Tag
          icon={<ReadOutlined />}
          color="blue"
          className="!px-3 !py-1 !rounded-full !text-sm !border-none !bg-slate-100 !text-slate-600"
        >
          海量真题
        </Tag>
        <Tag
          icon={<ThunderboltOutlined />}
          color="blue"
          className="!px-3 !py-1 !rounded-full !text-sm !border-none !bg-slate-100 !text-slate-600"
        >
          精华笔记
        </Tag>
      </div>
    </div>
  );
};

export default HeroSection;
