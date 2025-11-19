"use client";

import { Avatar, Button, Card, Space } from "antd";
import { EditOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useScreen from "@/src/hook/useScreen";
import { useAppSelector } from "@/src/store/hooks";
import UpdateUserProfileModal from "./components/UpdateUserProfileModal";
import UpdateUserEmailModal from "./components/UpdateUserEmailModal";
const { Meta } = Card;

export default function ProfilePage() {
  const router = useRouter();
  const { isMobile } = useScreen();
  const { userProfile } = useAppSelector((state) => state.user);
  const [openUpdateUserProfileModal, setOpenUpdateUserProfileModal] =
    useState(false);
  const [openUpdateUserEmailModal, setOpenUpdateUserEmailModal] =
    useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex justify-between items-center">
          <Meta
            avatar={
              <div className="border border-grey rounded-full">
                <Avatar src="/default-avatar.webp" size={52} />
              </div>
            }
            title={userProfile ? userProfile.name : "用户名称"}
            description={userProfile ? userProfile.email : "用户邮箱"}
          />
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => setOpenUpdateUserProfileModal(true)}
            >
              {isMobile ? "" : "修改资料"}
            </Button>
            <Button
              icon={<MailOutlined />}
              onClick={() => setOpenUpdateUserEmailModal(true)}
            >
              {isMobile ? "" : "修改邮箱"}
            </Button>
          </Space>
        </div>
      </Card>

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
