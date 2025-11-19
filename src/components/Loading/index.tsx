"use client";

import { Spin } from "antd";
import { useAppSelector } from "@/src/store/hooks";

const Loading = () => {
  const { count } = useAppSelector((state) => state.loading);
  const isLoading = count > 0;

  if (!isLoading) {
    return null;
  }

  return <Spin size="large" fullscreen={true} />;
};

export default Loading;
