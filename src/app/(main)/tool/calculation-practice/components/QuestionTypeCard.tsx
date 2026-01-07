import { Tag, Typography } from "antd";
import { CheckCircleOutlined, RightOutlined } from "@ant-design/icons";
import { QuestionType, QuestionTypeConfig } from "@/src/type";

const { Text } = Typography;

interface QuestionTypeCardProps {
  type: QuestionTypeConfig;
  selected: boolean;
  onSelect: (value: QuestionType) => void;
}

export default function QuestionTypeCard({
  type,
  selected,
  onSelect,
}: QuestionTypeCardProps) {
  return (
    <div
      onClick={() => onSelect(type.value)}
      className={`group relative p-4 md:p-5 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
        selected
          ? "border-ant-blue-500 bg-ant-blue-50/30 ring-4 ring-ant-blue-50"
          : "border-white bg-white hover:border-ant-grey-200"
      }`}
    >
      <div className="flex flex-col h-full justify-between gap-2 md:gap-3">
        <div>
          <Text
            strong
            className={`text-sm md:text-base block mb-0.5 md:mb-1 ${
              selected ? "text-ant-blue-600" : "text-ant-grey-800"
            }`}
          >
            {type.label}
          </Text>
          <Text type="secondary" className="font-mono text-xs md:text-sm">
            {type.description}
          </Text>
        </div>

        <div className="flex items-center justify-between">
          <Tag className="!border-none bg-ant-grey-50 text-ant-grey-500 rounded-lg m-0 !text-[10px] md:!text-xs">
            {type.category === "division" ? "允许误差" : "精确匹配"}
          </Tag>
          {selected ? (
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-ant-blue-500 flex items-center justify-center text-white text-[10px] md:text-xs">
              <CheckCircleOutlined />
            </div>
          ) : (
            <RightOutlined className="text-ant-grey-300 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-xs" />
          )}
        </div>
      </div>
    </div>
  );
}

