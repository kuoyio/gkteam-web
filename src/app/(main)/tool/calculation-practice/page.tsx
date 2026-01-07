"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  InputNumber,
  message,
  Input,
  Segmented,
  Typography,
  InputRef,
} from "antd";
import {
  PlayCircleOutlined,
  RightOutlined,
  CalculatorOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { generatePractice, submitPractice } from "@/src/api";
import {
  QuestionType,
  GeneratePracticeResponse,
  AnswerItem,
  QUESTION_TYPE_CONFIGS,
  CATEGORY_INFO,
  COMMON_COUNTS,
} from "@/src/type";
import { formatTotalTime } from "@/src/lib/util";
import { BackgroundDecorations, CategoryGroup } from "./components";

const { Title, Text } = Typography;

type Stage = "setup" | "practice";

export default function CalculationPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<Stage>("setup");
  const [autoStarted, setAutoStarted] = useState(false);

  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [loading, setLoading] = useState(false);

  const [practiceData, setPracticeData] =
    useState<GeneratePracticeResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [practiceStartTime, setPracticeStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const inputRef = useRef<InputRef>(null);

  const startPractice = useCallback(async (type: QuestionType, count: number) => {
    try {
      setLoading(true);
      const response = await generatePractice({
        questionType: type,
        count: count,
      });
      setPracticeData(response);
      setCurrentIndex(0);
      setAnswers([]);
      setCurrentAnswer("");
      const now = Date.now();
      setPracticeStartTime(now);
      setQuestionStartTime(now);
      setElapsedTime(0);
      setStage("practice");
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoStarted) return;

    const typeParam = searchParams.get("type") as QuestionType | null;
    const countParam = searchParams.get("count");

    if (typeParam && countParam) {
      const isValidType = QUESTION_TYPE_CONFIGS.some((t) => t.value === typeParam);
      const count = parseInt(countParam, 10);

      if (isValidType && count >= 1 && count <= 100) {
        setSelectedType(typeParam);
        setQuestionCount(count);
        setAutoStarted(true);
        startPractice(typeParam, count);
        router.replace("/tool/calculation-practice");
      }
    }
  }, [searchParams, autoStarted, startPractice, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === "practice" && practiceStartTime > 0) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - practiceStartTime);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [stage, practiceStartTime]);

  useEffect(() => {
    if (stage === "practice" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [stage, currentIndex]);

  const handleStart = useCallback(async () => {
    if (!selectedType) {
      message.warning("请选择题目类型");
      return;
    }
    if (questionCount < 1 || questionCount > 100) {
      message.warning("题量请设置在 1-100 之间");
      return;
    }
    await startPractice(selectedType, questionCount);
  }, [selectedType, questionCount, startPractice]);

  const handleNextQuestion = useCallback(() => {
    if (!practiceData) return;

    const spentTime = Date.now() - questionStartTime;
    const newAnswer: AnswerItem = {
      questionIndex: practiceData.questions[currentIndex].questionIndex,
      answer: currentAnswer.trim(),
      spentTime,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentIndex < practiceData.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer("");
      setQuestionStartTime(Date.now());
    } else {
      handleSubmit(newAnswers);
    }
  }, [practiceData, currentIndex, currentAnswer, answers, questionStartTime]);

  const handleSubmit = async (finalAnswers: AnswerItem[]) => {
    if (!practiceData) return;

    const totalSpentTime = Date.now() - practiceStartTime;

    try {
      setLoading(true);
      const response = await submitPractice({
        sessionId: practiceData.sessionId,
        totalSpentTime,
        answers: finalAnswers,
      });
      router.push(`/tool/calculation-practice/${response.id}`);
    } catch (e) {
      message.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentAnswer.trim()) {
      handleNextQuestion();
    }
  };

  const groupedTypes = Object.entries(CATEGORY_INFO).map(([category, info]) => ({
    category,
    info,
    types: QUESTION_TYPE_CONFIGS.filter((t) => t.category === category),
  }));

  const renderSetupStage = () => (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-6">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-ant-blue-500 flex items-center justify-center shadow-lg shadow-ant-blue-100">
            <CalculatorOutlined className="text-2xl md:text-3xl text-white" />
          </div>
          <div>
            <Title level={2} className="!mb-0 md:!mb-1 !text-2xl md:!text-3xl">
              速算训练营
            </Title>
            <Text type="secondary" className="text-sm md:text-lg">
              提升反应速度，掌握速算技巧
            </Text>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-start gap-2 md:gap-3 bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl border border-ant-grey-200 shadow-sm">
          <Text className="ml-2 font-medium text-sm md:text-base whitespace-nowrap">
            题目数量
          </Text>
          <div className="flex items-center gap-1 md:gap-2">
            <Segmented
              options={COMMON_COUNTS.map((c) => ({ label: String(c), value: c }))}
              value={
                COMMON_COUNTS.includes(questionCount) ? questionCount : undefined
              }
              onChange={(value) => setQuestionCount(value as number)}
              className="bg-ant-grey-50 !text-xs md:!text-sm"
            />
            <InputNumber
              min={1}
              max={100}
              value={questionCount}
              onChange={(value) => value && setQuestionCount(value)}
              className="!w-12 md:!w-16 border-none bg-transparent hover:bg-ant-grey-50 focus:bg-white !text-xs md:!text-sm"
              controls={false}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:gap-10 pb-32 md:pb-0">
        {groupedTypes.map(({ category, info, types }) => (
          <CategoryGroup
            key={category}
            category={category}
            info={info}
            types={types}
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 md:p-12 flex justify-center z-50">
        <Button
          type="primary"
          size="large"
          icon={<PlayCircleOutlined className="text-lg md:text-xl" />}
          loading={loading}
          disabled={!selectedType}
          onClick={handleStart}
          className={`!h-14 md:!h-16 !px-10 md:!px-12 !text-lg md:!text-xl !rounded-xl md:!rounded-2xl shadow-2xl shadow-ant-blue-200 border-none w-full md:w-auto transition-all duration-500 ${
            !selectedType ? "opacity-50 grayscale" : "opacity-100"
          }`}
          style={{
            background: selectedType
              ? "linear-gradient(135deg, #1677ff 0%, #722ed1 100%)"
              : "#bfbfbf",
          }}
        >
          开始挑战
        </Button>
      </div>
    </div>
  );

  const renderPracticeStage = () => {
    if (!practiceData) return null;

    const currentQuestion = practiceData.questions[currentIndex];
    const progress =
      ((currentIndex + 1) / practiceData.questions.length) * 100;
    const isLastQuestion = currentIndex === practiceData.questions.length - 1;

    return (
      <div className="max-w-4xl mx-auto px-4 h-[calc(100vh-120px)] flex flex-col justify-center py-4 md:py-8">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => setStage("setup")}
            className="!h-10 md:!h-12 !px-2 md:!px-4 hover:bg-ant-grey-100 rounded-xl text-ant-grey-500"
          >
            <span className="hidden md:inline">返回</span>
          </Button>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="text-center">
              <Text
                type="secondary"
                className="text-[10px] md:text-xs uppercase tracking-wider block mb-0.5 md:mb-1"
              >
                已用时间
              </Text>
              <Text
                strong
                className="text-lg md:text-2xl font-mono text-ant-blue-600 block leading-tight"
              >
                {formatTotalTime(elapsedTime)}
              </Text>
            </div>
            <div className="h-6 md:h-8 w-px bg-ant-grey-200" />
            <div className="text-center">
              <Text
                type="secondary"
                className="text-[10px] md:text-xs uppercase tracking-wider block mb-0.5 md:mb-1"
              >
                当前进度
              </Text>
              <Text
                strong
                className="text-lg md:text-2xl font-mono text-ant-purple-600 block leading-tight"
              >
                {currentIndex + 1} / {practiceData.questions.length}
              </Text>
            </div>
          </div>

          <div className="w-10 md:w-24" />
        </div>

        <div className="w-full h-1.5 md:h-2 bg-ant-grey-100 rounded-full overflow-hidden mb-8 md:mb-16">
          <div
            className="h-full bg-gradient-to-r from-ant-blue-500 to-ant-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          <div className="relative group text-center">
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-tr from-ant-blue-50 to-ant-purple-50 rounded-[20px] md:rounded-[40px] opacity-50 group-hover:opacity-100 transition-opacity blur-xl md:blur-2xl" />
            <div className="relative text-4xl sm:text-6xl md:text-9xl font-bold text-ant-grey-800 tracking-tight font-mono whitespace-nowrap px-4">
              {currentQuestion.content}
            </div>
          </div>

          <div className="w-full max-w-xs md:max-w-md flex flex-col gap-4">
            <Input
              ref={inputRef}
              value={currentAnswer}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
                  setCurrentAnswer(value);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="?"
              inputMode="decimal"
              className="!text-center !text-4xl md:!text-6xl !h-16 md:!h-24 !rounded-xl md:!rounded-[24px] !border-2 md:!border-4 !border-ant-grey-100 focus:!border-ant-blue-500 focus:!shadow-2xl focus:!shadow-ant-blue-100 !font-mono !bg-white transition-all"
              autoComplete="off"
            />
            <div className="flex justify-between items-center px-1 md:px-2">
              <Text
                type="secondary"
                className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm"
              >
                <span className="w-4 h-4 md:w-5 md:h-5 rounded bg-ant-grey-100 flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                  ENT
                </span>
                按回车下一题
              </Text>
              <Button
                type="link"
                onClick={handleNextQuestion}
                disabled={!currentAnswer.trim()}
                className="!p-0 h-auto text-xs md:text-sm"
              >
                {isLastQuestion ? "完成挑战" : "下一题"} <RightOutlined />
              </Button>
            </div>
          </div>
        </div>

        <div className="fixed top-1/4 -left-12 w-32 md:w-48 h-32 md:h-48 bg-ant-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="fixed bottom-1/4 -right-12 w-48 md:w-64 h-48 md:h-64 bg-ant-purple-50 rounded-full blur-3xl opacity-30 pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-x-hidden">
      <BackgroundDecorations />
      <div className="relative z-10">
        {stage === "setup" && renderSetupStage()}
        {stage === "practice" && renderPracticeStage()}
      </div>
    </div>
  );
}
