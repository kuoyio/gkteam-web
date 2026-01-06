"use client";

import { Modal, Form, Input, message } from "antd";
import { resetPassword } from "@/src/api/user";
import { ResetPasswordRequest } from "@/src/type/user";

interface ResetPasswordModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function ResetPasswordModal({
  open,
  onCancel,
}: ResetPasswordModalProps) {
  const [form] = Form.useForm();

  const handleFinish = async (values: ResetPasswordRequest) => {
    try {
      await resetPassword(values);
      message.success("密码重置成功");
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
      title="重置密码"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="确定"
      cancelText="取消"
      centered={true}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="当前密码"
          name="currentPassword"
          rules={[{ required: true, message: "请输入当前密码" }]}
        >
          <Input.Password placeholder="请输入当前密码" />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            { required: true, message: "请输入新密码" },
            { min: 6, message: "密码长度至少6个字符" },
            { max: 50, message: "密码长度最多50个字符" },
          ]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "请再次输入新密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入新密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

