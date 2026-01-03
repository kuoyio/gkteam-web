"use client";

import { Button, Checkbox, Form, Input, message } from "antd";
import { MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendOtp } from "@/src/api/email";
import { OtpType } from "@/src/type/email";
import { login } from "@/src/api";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const handleNextStep = async () => {
    try {
      await form.validateFields(["email"]);
    } catch {
      return;
    }

    const email = form.getFieldValue("email");
    setLoading(true);
    try {
      await sendOtp(email, OtpType.LOGIN);
      message.success("验证码已发送");
      setStep(1);
      startCountdown();
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const email = form.getFieldValue("email");
    try {
      await sendOtp(email, OtpType.LOGIN);
      message.success("验证码已重新发送");
      startCountdown();
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
      await login({ email, otp });

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
    <Form form={form} className="w-full" layout="vertical" size="large">
      <div className="space-y-4">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "邮箱格式不正确" },
          ]}
          className="!mb-0"
        >
          <Input
            prefix={<MailOutlined className="text-ant-grey-400 mr-2" />}
            placeholder="请输入邮箱地址"
            disabled={step === 1}
            className="!rounded-2xl border-white/40 bg-white/50 focus:bg-white transition-all disabled:bg-ant-grey-50 disabled:text-ant-grey-400"
          />
        </Form.Item>

        {step === 0 && (
          <Form.Item shouldUpdate className="!mb-0">
            {() => (
              <Button
                type="primary"
                block
                loading={loading}
                disabled={
                  !form.getFieldValue("email") ||
                  form
                    .getFieldsError(["email"])
                    .some((item) => item.errors.length > 0)
                }
                onClick={handleNextStep}
                className="h-14 !rounded-2xl !text-base font-bold bg-ant-blue-500 shadow-[0_8px_20px_-6px_rgba(22,119,255,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(22,119,255,0.4)] transition-all border-none mt-4"
              >
                下一步
              </Button>
            )}
          </Form.Item>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex justify-end items-center px-1">
              <Button
                type="link"
                size="small"
                onClick={() => setStep(0)}
                className="!text-ant-blue-500 !p-0 h-auto text-xs"
              >
                修改邮箱
              </Button>
            </div>

            <Form.Item
              name="otp"
              rules={[{ required: true, message: "请输入验证码" }]}
              className="!mb-2"
            >
              <div className="flex gap-3">
                <Input
                  prefix={<SafetyOutlined className="text-ant-grey-400 mr-2" />}
                  placeholder="6位验证码"
                  className="flex-1 !rounded-2xl border-white/40 bg-white/50 focus:bg-white transition-all"
                />
                <Button
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className="!rounded-2xl !px-6 border-white/40 text-sm font-medium hover:text-ant-blue-500"
                >
                  {countdown > 0 ? `${countdown}s` : "重新发送"}
                </Button>
              </div>
            </Form.Item>

            <Form.Item className="!mb-0">
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="text-[13px] text-ant-grey-500 leading-relaxed"
              >
                我已阅读并同意
                <Link
                  href="/site/terms"
                  target="_blank"
                  className="text-ant-blue-500 hover:underline mx-1 font-medium"
                >
                  服务协议
                </Link>
                与
                <Link
                  href="/site/privacy"
                  target="_blank"
                  className="text-ant-blue-500 hover:underline mx-1 font-medium"
                >
                  隐私条款
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item shouldUpdate className="!mb-0">
              {() => (
                <Button
                  type="primary"
                  block
                  loading={loading}
                  disabled={
                    !agreeTerms ||
                    !form.getFieldValue("otp") ||
                    form.getFieldError("otp").length > 0
                  }
                  onClick={handleLoginButton}
                  className="h-14 !rounded-2xl !text-base font-bold bg-ant-blue-500 shadow-[0_8px_20px_-6px_rgba(22,119,255,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(22,119,255,0.4)] transition-all border-none"
                >
                  立即登录
                </Button>
              )}
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  );
};

export default LoginForm;
