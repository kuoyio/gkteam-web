"use client";

import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/src/api";
import ForgotPasswordModal from "@/src/app/(auth)/components/ForgotPasswordModal";
import TermsAgreement from "@/src/app/(auth)/components/TermsAgreement";

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoginButton = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");
    try {
      setLoading(true);
      await login({ email, password, device: "WEB" });

      message.success("登录成功");

      const redirectUrl = searchParams.get("redirect");
      if (redirectUrl) {
        router.push(decodeURIComponent(redirectUrl));
      } else {
        router.push("/user/profile");
      }
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码长度至少6位" },
            { max: 50, message: "密码长度最多50位" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="登录密码" />
        </Form.Item>

        <div className="flex justify-end -mt-4 mb-4">
          <Button
            type="link"
            size="small"
            onClick={() => setForgotModalOpen(true)}
            className="!p-0 h-auto text-[13px]"
          >
            忘记密码？
          </Button>
        </div>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              block
              loading={loading}
              disabled={
                !form.getFieldValue("email") ||
                !form.getFieldValue("password") ||
                form.getFieldsError().some((item) => item.errors.length > 0)
              }
              onClick={handleLoginButton}
            >
              立即登录
            </Button>
          )}
        </Form.Item>

        <TermsAgreement />

        <div className="text-center pt-2">
          <span className="text-ant-grey-400 text-sm">还没有账号？</span>
          <Link
            href="/register"
            className="text-ant-blue-500 hover:underline ml-1 text-sm font-medium"
          >
            立即注册
          </Link>
        </div>
      </Form>

      <ForgotPasswordModal
        open={forgotModalOpen}
        onCancel={() => setForgotModalOpen(false)}
      />
    </>
  );
}
