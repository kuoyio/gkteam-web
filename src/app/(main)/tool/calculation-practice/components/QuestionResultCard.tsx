import { Space, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { QuestionResult } from "@/src/type";
import { formatTime } from "@/src/lib/util";

const { Text } = Typography;

interface QuestionResultCardProps {
  question: QuestionResult;
}

export default function QuestionResultCard({
  question,
}: QuestionResultCardProps) {
  const { isCorrect, content, userAnswer, correctAnswer, spentTime } = question;

  return (
    <div className="group relative bg-white p-4 md:p-6 rounded-xl md:rounded-[24px] border border-ant-grey-100 hover:border-ant-blue-200 transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl ${
              isCorrect
                ? "bg-green-50 text-ant-green-500"
                : "bg-red-50 text-ant-red-500"
            }`}
          >
            {isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          </div>
          <div>
            <Text
              strong
              className="text-xl md:text-2xl font-mono block mb-0.5 md:mb-1 leading-none"
            >
              {content}
            </Text>
            <Space
              split={
                <div className="w-0.5 h-0.5 rounded-full bg-ant-grey-200" />
              }
              size={4}
            >
              <Text type="secondary" className="text-[10px] md:text-xs">
                你的答案:{" "}
                <span
                  className={
                    isCorrect ? "text-ant-green-600" : "text-ant-red-500"
                  }
                >
                  {userAnswer || "-"}
                </span>
              </Text>
              {!isCorrect && (
                <Text type="secondary" className="text-[10px] md:text-xs">
                  正确答案:{" "}
                  <span className="text-ant-green-600">{correctAnswer}</span>
                </Text>
              )}
            </Space>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <Text className="text-[10px] md:text-xs text-ant-grey-400 block mb-0.5 uppercase tracking-widest leading-none">
            用时
          </Text>
          <Text
            strong
            className="font-mono text-ant-grey-800 text-xs md:text-base"
          >
            {formatTime(spentTime)}
          </Text>
        </div>
      </div>
    </div>
  );
}

