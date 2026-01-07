"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Tag,
  Typography,
  Spin,
  Result as AntdResult,
} from "antd";
import {
  ReloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { getPracticeDetail } from "@/src/api";
import { PracticeResult } from "@/src/type";
import { formatTotalTime } from "@/src/lib/util";
import { BackgroundDecorations, QuestionResultCard } from "../components";

const { Title, Text } = Typography;

export default function PracticeResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PracticeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchResult();
    }
  }, [id]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const data = await getPracticeDetail(id);
      setResult(data);
    } catch (e) {
      setError((e as Error).message || "获取练习记录失败");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" tip="正在加载练习记录..." />
      </div>
    );
  }

  if (error || !result) {
    return (
      <AntdResult
        status="error"
        title="出错了"
        subTitle={error || "找不到该练习记录"}
        extra={[
          <Button
            type="primary"
            key="back"
            onClick={() => router.push("/tool/calculation-practice")}
          >
            返回练习列表
          </Button>,
        ]}
      />
    );
  }

  const accuracyPercent = (result.correctCount / result.totalCount) * 100;
  const isExcellent = accuracyPercent >= 90;
  const isGood = accuracyPercent >= 70;

  const getStatusColor = () => {
    if (isExcellent) return "bg-ant-green-500";
    if (isGood) return "bg-ant-orange-500";
    return "bg-ant-red-500";
  };

  const getStatusText = () => {
    if (isExcellent) return "太棒了！🎉";
    if (isGood) return "做得好！👍";
    return "再接再厉！💪";
  };

  const getTagColor = () => {
    if (isExcellent) return "success";
    if (isGood) return "warning";
    return "error";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-x-hidden">
      <BackgroundDecorations />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-6">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/tool/calculation-practice")}
            className="!h-10 hover:bg-ant-grey-100 rounded-xl text-ant-grey-500"
          >
            返回练习
          </Button>
        </div>

        <div className="relative mb-8 p-6 md:p-8 rounded-2xl md:rounded-[32px] overflow-hidden bg-white border border-ant-grey-100 shadow-xl shadow-ant-grey-100/30">
          <div className={`absolute top-0 left-0 w-full h-1.5 ${getStatusColor()}`} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Title level={3} className="!mb-0">
                  {getStatusText()}
                </Title>
                <Tag color={getTagColor()} className="rounded-full !m-0">
                  {result.accuracy} 正确
                </Tag>
              </div>
              <Text className="text-ant-grey-500 block">
                在 <Text strong>{result.questionTypeDescription}</Text>{" "}
                中完成了挑战
              </Text>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <Text
                  type="secondary"
                  className="text-[10px] md:text-xs uppercase tracking-widest block mb-1"
                >
                  总用时
                </Text>
                <Text
                  strong
                  className="text-xl md:text-2xl font-mono text-ant-purple-600 block leading-none"
                >
                  {formatTotalTime(result.totalSpentTime)}
                </Text>
              </div>
              <div className="w-px h-8 bg-ant-grey-100 hidden sm:block" />
              <div className="text-center">
                <Text
                  type="secondary"
                  className="text-[10px] md:text-xs uppercase tracking-widest block mb-1"
                >
                  平均速度
                </Text>
                <Text
                  strong
                  className="text-xl md:text-2xl font-mono text-ant-cyan-600 block leading-none"
                >
                  {(result.totalSpentTime / result.totalCount / 1000).toFixed(1)}s
                </Text>
              </div>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={() =>
                  router.push(
                    `/tool/calculation-practice?type=${result.questionType}&count=${result.totalCount}`
                  )
                }
                className="!h-10 md:!h-12 !px-6 !rounded-xl shadow-md"
              >
                再次练习
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <Title level={4} className="!mb-0 md:!text-2xl">
              答题明细
            </Title>
            <div className="flex gap-3 md:gap-4">
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-ant-green-500" />
                <Text type="secondary" className="text-xs md:text-sm">
                  正确 {result.correctCount}
                </Text>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-ant-red-500" />
                <Text type="secondary" className="text-xs md:text-sm">
                  错误 {result.totalCount - result.correctCount}
                </Text>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {result.questionResults.map((question, index) => (
              <QuestionResultCard key={index} question={question} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
