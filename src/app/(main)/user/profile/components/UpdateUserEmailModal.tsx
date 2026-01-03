"use client";

import { Modal, Form, Input, Button, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { updateUserEmail } from "@/src/api/user";
import { sendOtp } from "@/src/api/email";
import { useUserProfile } from "../../context/UserProfileContext";
import { UpdateUserEmailRequest } from "@/src/type/user";
import { OtpType } from "@/src/type/email";

interface UpdateUserEmailModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function UpdateUserEmailModal({
  open,
  onCancel,
}: UpdateUserEmailModalProps) {
  const [form] = Form.useForm();
  const { userProfile, setUserProfile } = useUserProfile();
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const emailValue = Form.useWatch("email", form);
  const otpValue = Form.useWatch("otp", form);

  useEffect(() => {
    if (open) {
      form.resetFields();
      setCountdown(0);
    }
  }, [open, form]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const isButtonDisabled = useMemo(() => {
    if (!emailValue || !emailValue.trim() || !otpValue || !otpValue.trim()) {
      return true;
    }
    return emailValue === userProfile?.email;
  }, [emailValue, otpValue, userProfile?.email]);

  const handleSendOtp = async () => {
    try {
      await form.validateFields(["email"]);
      const email = form.getFieldValue("email");

      if (email === userProfile?.email) {
        message.warning("新邮箱不能与当前邮箱相同");
        return;
      }

      setIsSending(true);
      await sendOtp(email, OtpType.UPDATE_EMAIL);
      message.success("验证码已发送到新邮箱");
      setCountdown(60);
    } catch (error: unknown) {
      const err = error as { errorFields?: unknown; message?: string };
      if (err.errorFields) {
        return;
      }
      message.error(err.message || "发送验证码失败");
    } finally {
      setIsSending(false);
    }
  };

  const handleFinish = async (values: UpdateUserEmailRequest) => {
    try {
      const response = await updateUserEmail(values);
      setUserProfile(response);
      message.success("邮箱修改成功");
      form.resetFields();
      setCountdown(0);
      onCancel();
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCountdown(0);
    onCancel();
  };

  return (
    <Modal
      title="修改邮箱"
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
        <Form.Item label="当前邮箱">
          <Input value={userProfile?.email} disabled />
        </Form.Item>

        <Form.Item
          label="新邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入新邮箱" },
            { type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input placeholder="请输入新邮箱地址" />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="otp"
          rules={[
            { required: true, message: "请输入验证码" },
            { len: 6, message: "验证码必须是6位数字" },
          ]}
        >
          <div className="flex gap-2">
            <Input
              placeholder="请输入6位验证码"
              maxLength={6}
              className="flex-1"
            />
            <Button
              onClick={handleSendOtp}
              disabled={countdown > 0}
              loading={isSending}
            >
              {countdown > 0 ? `${countdown}秒后重试` : "发送验证码"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
