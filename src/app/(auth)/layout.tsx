"use client";

import Image from "next/image";
import Link from "next/link";
import { Shrikhand } from "next/font/google";
import { Typography } from "antd";
import { ReactNode } from "react";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const { Text } = Typography;

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-100/40 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-[30%] right-[-5%] w-[30%] h-[30%] bg-sky-100/30 rounded-full blur-[100px] animate-pulse" />

      <div className="z-10 w-full max-w-[460px] transform transition-all duration-500 hover:scale-[1.01]">
        <div className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[48px] p-10 sm:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col gap-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-ant-blue-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-white p-4 rounded-[28px] shadow-xl shadow-blue-500/10 border border-blue-50 transform group-hover:-translate-y-1 transition-transform duration-500">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="relative"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/">
                <h1
                  className={`${shrikhand.className} text-5xl bg-linear-to-br from-ant-blue-600 to-ant-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                >
                  GKTeam
                </h1>
              </Link>
              <div className="flex flex-col gap-1">
                <Text className="text-ant-blue-600/80 text-[10px] tracking-[0.4em] uppercase font-black">
                  公考小分队
                </Text>
                <div className="h-px w-8 bg-ant-blue-100 mx-auto mt-1" />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

