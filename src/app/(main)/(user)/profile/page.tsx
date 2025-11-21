"use client";

import { Avatar, Space, Typography, message } from "antd";
import { EditOutlined, CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppSelector } from "@/src/store/hooks";
import UpdateUserProfileModal from "./components/UpdateUserProfileModal";
import UpdateUserEmailModal from "./components/UpdateUserEmailModal";

const { Title } = Typography;

export default function ProfilePage() {
  const { userProfile } = useAppSelector((state) => state.user);
  const [openUpdateUserProfileModal, setOpenUpdateUserProfileModal] =
    useState(false);
  const [openUpdateUserEmailModal, setOpenUpdateUserEmailModal] =
    useState(false);

  const handleCopyId = () => {
    if (userProfile?.id) {
      navigator.clipboard.writeText(userProfile.id);
      message.success("ID已复制到剪贴板");
    }
  };

  return (
    <div>
      <Title level={4} className="mb-6">
        基本信息
      </Title>

      <div className="flex justify-center mb-6">
        <div className="border border-grey rounded-full">
          <Avatar src="/default-avatar.webp" size={80} />
        </div>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex flex-col gap-y-1">
            <span>用户ID</span>
            <span className="text-grey">{userProfile?.id || ""}</span>
          </div>
          <CopyOutlined className="cursor-pointer" onClick={handleCopyId} />
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex flex-col gap-y-1">
            <span>用户名</span>
            <span className="text-grey">{userProfile?.name || ""}</span>
          </div>
          <EditOutlined
            className="cursor-pointer"
            onClick={() => setOpenUpdateUserProfileModal(true)}
          />
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex flex-col gap-y-1">
            <span>邮箱</span>
            <span className="text-grey">{userProfile?.email || ""}</span>
          </div>
          <EditOutlined
            className="cursor-pointer"
            onClick={() => setOpenUpdateUserEmailModal(true)}
          />
        </div>
      </Space>

      <UpdateUserProfileModal
        open={openUpdateUserProfileModal}
        onCancel={() => setOpenUpdateUserProfileModal(false)}
      />

      <UpdateUserEmailModal
        open={openUpdateUserEmailModal}
        onCancel={() => setOpenUpdateUserEmailModal(false)}
      />
    </div>
  );
}
