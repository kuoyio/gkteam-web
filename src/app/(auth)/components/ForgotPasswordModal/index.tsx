"use client";

import { Button, Form, Input, message, Modal, Steps } from "antd";
import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { sendOtp } from "@/src/api/email";
import { OtpType } from "@/src/type/email";
import { forgotPassword } from "@/src/api";

interface ForgotPasswordModalProps {
  open: boolean;
  onCancel: () => void;
}

const ForgotPasswordModal = ({ open, onCancel }: ForgotPasswordModalProps) => {
  const [forgotStep, setForgotStep] = useState(0);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotForm] = Form.useForm();
  const [forgotLoading, setForgotLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleForgotSendOtp = async () => {
    try {
      await forgotForm.validateFields(["email"]);
    } catch {
      return;
    }

    const email = forgotForm.getFieldValue("email");
    setForgotLoading(true);
    try {
      await sendOtp(email, OtpType.FORGOT_PASSWORD);
      message.success("验证码已发送到您的邮箱");
      setForgotEmail(email);
      setForgotStep(1);
      startCountdown();
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp(forgotEmail, OtpType.FORGOT_PASSWORD);
      message.success("验证码已重新发送");
      startCountdown();
    } catch (e) {
      message.error((e as Error).message);
    }
  };

  const handleForgotSubmit = async () => {
    try {
      await forgotForm.validateFields([
        "otp",
        "newPassword",
        "confirmPassword",
      ]);
    } catch {
      return;
    }

    const otp = forgotForm.getFieldValue("otp");
    const newPassword = forgotForm.getFieldValue("newPassword");

    setForgotLoading(true);
    try {
      await forgotPassword({ email: forgotEmail, otp, newPassword });
      message.success("密码重置成功，请使用新密码登录");
      handleClose();
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleClose = () => {
    setForgotStep(0);
    setForgotEmail("");
    forgotForm.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="找回密码"
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      width={440}
      centered
      maskClosable={false}
    >
      <Steps
        current={forgotStep}
        size="small"
        className="!mb-4"
        items={[{ title: "验证邮箱" }, { title: "重置密码" }]}
      />

      <Form form={forgotForm} layout="vertical" size="large">
        {forgotStep === 0 && (
          <>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                { type: "email", message: "邮箱格式不正确" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="请输入注册时使用的邮箱"
              />
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  block
                  loading={forgotLoading}
                  disabled={
                    !forgotForm.getFieldValue("email") ||
                    forgotForm
                      .getFieldsError(["email"])
                      .some((item) => item.errors.length > 0)
                  }
                  onClick={handleForgotSendOtp}
                >
                  发送验证码
                </Button>
              )}
            </Form.Item>
          </>
        )}

        {forgotStep === 1 && (
          <>
            <div className="bg-ant-blue-50 rounded-lg p-3 text-sm text-ant-blue-600 mb-6">
              验证码已发送至 <span className="font-medium">{forgotEmail}</span>
            </div>

            <Form.Item
              name="otp"
              rules={[{ required: true, message: "请输入验证码" }]}
            >
              <div className="flex gap-3">
                <Input
                  prefix={<SafetyOutlined />}
                  placeholder="6位验证码"
                  className="flex-1"
                />
                <Button onClick={handleResendOtp} disabled={countdown > 0}>
                  {countdown > 0 ? `${countdown}s` : "重新发送"}
                </Button>
              </div>
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "请输入新密码" },
                { min: 6, message: "密码长度至少6位" },
                { max: 50, message: "密码长度最多50位" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入新密码（6-50位）"
              />
            </Form.Item>

            <Form.Item
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
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请再次输入新密码"
              />
            </Form.Item>

            <div className="flex gap-4">
              <Button block onClick={() => setForgotStep(0)}>
                上一步
              </Button>
              <Form.Item shouldUpdate noStyle>
                {() => (
                  <Button
                    type="primary"
                    block
                    loading={forgotLoading}
                    disabled={
                      !forgotForm.getFieldValue("otp") ||
                      !forgotForm.getFieldValue("newPassword") ||
                      !forgotForm.getFieldValue("confirmPassword") ||
                      forgotForm
                        .getFieldsError([
                          "otp",
                          "newPassword",
                          "confirmPassword",
                        ])
                        .some((item) => item.errors.length > 0)
                    }
                    onClick={handleForgotSubmit}
                  >
                    确认重置
                  </Button>
                )}
              </Form.Item>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;

