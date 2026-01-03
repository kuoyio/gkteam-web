"use client";

import { Button, Typography } from "antd";
import TextEasterEgg from "@/src/components/TextEasterEgg";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Shrikhand } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CookieUtil from "@/src/lib/util/cookie-util";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const { Text } = Typography;

export default function Home() {
  const router = useRouter();

  const handleExplore = () => {
    const isLoggedIn = CookieUtil.isLoggedIn();
    if (isLoggedIn) {
      router.push("/note/169332126339173300");
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-ant-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse" />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-ant-blue-50 rounded-full blur-[120px] opacity-40 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="z-10 w-full max-w-[560px] flex flex-col items-center">
        <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 sm:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] flex flex-col items-center gap-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-ant-blue-200 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
            <Image
              src="/logo.png"
              alt="GKTeam Logo"
              width={80}
              height={80}
              className="relative drop-shadow-md group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>

          <div className="text-center space-y-4">
            <h1
              className={`${shrikhand.className} text-6xl sm:text-7xl text-ant-blue-500 leading-tight tracking-tight`}
            >
              GKTeam
            </h1>

            <div className="flex items-center justify-center gap-4 px-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-ant-grey-200 to-transparent" />
              <Text className="text-ant-grey-400 uppercase tracking-[0.4em] text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                公考小分队 · K师傅的公考训练营
              </Text>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-ant-grey-200 to-transparent" />
            </div>
          </div>

          <div className="w-full pt-4">
            <Button
              type="primary"
              size="large"
              onClick={handleExplore}
              className="w-full h-16 rounded-2xl text-lg font-bold bg-ant-blue-500 hover:bg-ant-blue-600 border-none shadow-[0_12px_24px_-8px_rgba(22,119,255,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(22,119,255,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
            >
              开始探索 <ArrowRightOutlined />
            </Button>
          </div>
        </div>

        <div className="mt-16 group cursor-pointer transition-all duration-500 hover:scale-105 text-center">
          <div className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-sm opacity-60 group-hover:opacity-100 transition-all">
            <TextEasterEgg />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center">
        <span className="text-[10px] text-ant-grey-300 uppercase tracking-[0.5em] font-medium opacity-50 select-none">
          Long-term progress as the method, successful landing as the result.
        </span>
      </div>
    </main>
  );
}
