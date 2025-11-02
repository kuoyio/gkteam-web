"use client";

import { useAppSelector } from "@/src/store/hooks";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";

export default function Home() {
  const { userProfile, loading } = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    LocalStorageUtil.remove("token");
    router.push("/login");
  };

  if (loading) {
    return <div className="p-8">加载中...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">欢迎来到首页</h1>
      {userProfile && (
        <div className="space-y-2">
          <p>
            <span className="font-semibold">用户ID:</span> {userProfile.id}
          </p>
          <p>
            <span className="font-semibold">用户名:</span> {userProfile.name}
          </p>
          <p>
            <span className="font-semibold">邮箱:</span> {userProfile.email}
          </p>
          <Button onClick={handleLogout} className="mt-4">
            退出登录
          </Button>
        </div>
      )}
    </div>
  );
}
