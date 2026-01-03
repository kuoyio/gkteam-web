"use client";
import LoginForm from "@/src/app/login/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { Shrikhand } from "next/font/google";
import { Typography } from "antd";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const { Text } = Typography;

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ant-blue-50 rounded-full blur-[120px] opacity-40 animate-pulse" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-ant-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="z-10 w-full max-w-[480px]">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[40px] p-8 sm:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] flex flex-col gap-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-6 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-ant-blue-200 rounded-full blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity" />
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="relative drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2">
                <h1
                  className={`${shrikhand.className} text-4xl text-ant-blue-500 group-hover: transition-colors`}
                >
                  GKTeam
                </h1>
                <Text className="text-ant-grey-400 text-xs tracking-[0.3em] uppercase font-semibold">
                  公考小分队 · K师傅的公考训练营
                </Text>
              </div>
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
