"use client";

import { Avatar, Card, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/src/store/hooks";

export default function UserInfoCard() {
  const { userProfile } = useAppSelector((state) => state.user);

  const handleCopyId = () => {
    if (userProfile?.id) {
      navigator.clipboard.writeText(userProfile.id);
      message.success("ID已复制到剪贴板");
    }
  };

  return (
    <Card>
      <div className="flex flex-col items-center gap-y-1">
        <div className="border border-ant-grey-500 rounded-full">
          <Avatar src="/default-avatar.webp" size={52} />
        </div>
        <span className="text-lg font-semibold">
          {userProfile?.name || "用户名称"}
        </span>
        <span className="text-ant-grey-500 text-sm">
          {userProfile?.email || "用户邮箱"}
        </span>
        <div className="flex items-center justify-center gap-2 text-ant-grey-500 text-xs">
          <span>ID: {userProfile?.id || "USER123456"}</span>
          <CopyOutlined
            className="cursor-pointer hover:text-ant-blue-500"
            onClick={handleCopyId}
          />
        </div>
      </div>
    </Card>
  );
}

