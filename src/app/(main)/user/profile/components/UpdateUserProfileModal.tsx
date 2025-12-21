"use client";

import { Modal, Form, Input, message } from "antd";
import { useEffect, useMemo } from "react";
import { updateUserProfile } from "@/src/api/user";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setUserProfile } from "@/src/store/slices/userSlice";
import { UpdateUserProfileRequest } from "@/src/type/user";

interface UpdateUserModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function UpdateUserProfileModal({
  open,
  onCancel,
}: UpdateUserModalProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);
  const nameValue = Form.useWatch("name", form);

  useEffect(() => {
    if (open && userProfile) {
      form.setFieldsValue({
        name: userProfile.name,
      });
    }
  }, [open, userProfile, form]);

  const isButtonDisabled = useMemo(() => {
    if (!nameValue || !nameValue.trim()) {
      return true;
    }
    return nameValue === userProfile?.name;
  }, [nameValue, userProfile?.name]);

  const handleFinish = async (values: UpdateUserProfileRequest) => {
    try {
      const response = await updateUserProfile(values);
      dispatch(setUserProfile(response));
      message.success("用户资料更新成功");
      form.resetFields();
      onCancel();
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="修改用户资料"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="确定"
      cancelText="取消"
      centered={true}
      okButtonProps={{ disabled: isButtonDisabled }}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="用户名"
          name="name"
          rules={[
            { required: true, message: "请输入用户名" },
            { min: 6, message: "用户名至少6个字符" },
            { max: 50, message: "用户名最多50个字符" },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
