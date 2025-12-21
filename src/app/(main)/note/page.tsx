import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "笔记 - 公考小分队",
  description: "公考小分队笔记功能，帮助您记录学习心得。",
};

export default function NotePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative">
        <div className="text-8xl mb-6 animate-spin" style={{ animationDuration: "3s" }}>
          ⚙️
        </div>
        <div className="absolute -top-2 -right-4 text-5xl animate-bounce" style={{ animationDuration: "2s" }}>
          😵‍💫
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-ant-grey-700 mb-4 font-['Maple_Mono']">
        系统提示
      </h1>

      <p className="text-lg md:text-xl text-ant-grey-600 mb-2">
        k师傅大脑短路，页面开发暂停中…
      </p>

      <p className="text-sm text-ant-grey-400 mt-6">
        💡 小贴士：喝杯咖啡也许能加速开发进度
      </p>

      <div className="w-64 h-2 bg-ant-grey-200 rounded-full mt-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-ant-blue-400 to-ant-purple-400 rounded-full animate-pulse"
          style={{ width: "0%" }}
        />
      </div>
      <p className="text-xs text-ant-grey-400 mt-2">开发进度：0%（大概）</p>
    </div>
  );
}

