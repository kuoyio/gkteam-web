"use client";

import { Spin } from "antd";
import { useAppSelector } from "@/src/store/hooks";
import "./index.scss";

const Loading = () => {
  const { count } = useAppSelector((state) => state.loading);
  const isLoading = count > 0;

  if (!isLoading) {
    return null;
  }

  return <Spin wrapperClassName="loading" size="large" fullscreen={true} />;
};

export default Loading;
