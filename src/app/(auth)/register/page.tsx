"use client";

import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendOtp } from "@/src/api/email";
import { OtpType } from "@/src/type/email";
import { register } from "@/src/api";
import TermsAgreement from "@/src/app/(auth)/components/TermsAgreement";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const router = useRouter();

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

  const handleSendOtp = async () => {
    try {
      await form.validateFields(["email"]);
    } catch {
      return;
    }

    const email = form.getFieldValue("email");
    setSendingOtp(true);
    try {
      await sendOtp(email, OtpType.REGISTER);
      message.success("验证码已发送到您的邮箱");
      startCountdown();
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleRegister = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    const email = form.getFieldValue("email");
    const otp = form.getFieldValue("otp");
    const password = form.getFieldValue("password");

    try {
      setLoading(true);
      await register({ email, password, otp });
      message.success("注册成功，请登录");
      router.push("/login");
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} className="w-full" layout="vertical" size="large">
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "邮箱格式不正确" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱地址" />
      </Form.Item>

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
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                onClick={handleSendOtp}
                loading={sendingOtp}
                disabled={
                  countdown > 0 ||
                  !form.getFieldValue("email") ||
                  form
                    .getFieldsError(["email"])
                    .some((item) => item.errors.length > 0)
                }
              >
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </Button>
            )}
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码" },
          { min: 6, message: "密码长度至少6位" },
          { max: 50, message: "密码长度最多50位" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="设置登录密码 (6-50位)"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请再次输入密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致"));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="确认登录密码" />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => {
          const allFieldsFilled =
            form.getFieldValue("email") &&
            form.getFieldValue("otp") &&
            form.getFieldValue("password") &&
            form.getFieldValue("confirmPassword");
          const hasErrors = form
            .getFieldsError(["email", "otp", "password", "confirmPassword"])
            .some((item) => item.errors.length > 0);

          return (
            <Button
              type="primary"
              block
              loading={loading}
              disabled={!allFieldsFilled || hasErrors}
              onClick={handleRegister}
            >
              立即注册
            </Button>
          );
        }}
      </Form.Item>

      <TermsAgreement />

      <div className="text-center pt-2">
        <span className="text-ant-grey-400 text-sm">已经有账号了？</span>
        <Link
          href="/login"
          className="text-ant-blue-500 hover:underline ml-1 text-sm font-medium"
        >
          立即登录
        </Link>
      </div>
    </Form>
  );
}
