"use client";

import { Button, Checkbox, Form, Input, message } from "antd";
import { MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendOtp } from "@/src/api/email";
import { OtpType } from "@/src/type/email";
import { login } from "@/src/api";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const handleClickOtpButton = async () => {
    try {
      await form.validateFields(["email"]);
    } catch {
      return;
    }

    const email = form.getFieldValue("email");

    try {
      await sendOtp(email, OtpType.LOGIN);
      message.success("验证码已发送");
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
    } catch (e) {
      message.error((e as Error).message);
    }
  };

  const handleLoginButton = async () => {
    try {
      await form.validateFields();
    } catch {
      return;
    }

    const email = form.getFieldValue("email");
    const otp = form.getFieldValue("otp");
    try {
      setLoading(true);
      const token = await login({ email, otp });

      LocalStorageUtil.set("token", token);

      message.success("登录成功");
      router.push("/");
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} className="w-full">
      <div className="!space-y-4">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "邮箱格式不正确" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="mr-2" />}
            placeholder="请输入您的邮箱"
            className="text-sm"
          />
        </Form.Item>
        <Form.Item
          name="otp"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <div className="flex gap-2">
            <Input
              prefix={<SafetyOutlined className="mr-2" />}
              placeholder="请输入6位验证码"
              className="flex-1"
            />
            <Button onClick={handleClickOtpButton} disabled={countdown > 0}>
              {countdown > 0 ? `${countdown}s` : "发送验证码"}
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="text-xs"
          >
            我已阅读并同意
            <Link
              href="/terms"
              target="_blank"
              className="text-ant-blue-500 mx-1"
            >
              服务协议
            </Link>
            和
            <Link
              href="/privacy"
              target="_blank"
              className="text-ant-blue-500 mx-1"
            >
              隐私条款
            </Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !text-sm"
            loading={loading}
            disabled={!agreeTerms}
            onClick={handleLoginButton}
          >
            登录
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
