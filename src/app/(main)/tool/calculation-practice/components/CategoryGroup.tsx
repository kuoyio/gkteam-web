import { Typography } from "antd";
import { QuestionType, QuestionTypeConfig, CategoryInfo } from "@/src/type";
import QuestionTypeCard from "./QuestionTypeCard";

const { Title } = Typography;

interface CategoryGroupProps {
  category: string;
  info: CategoryInfo;
  types: QuestionTypeConfig[];
  selectedType: QuestionType | null;
  onSelectType: (value: QuestionType) => void;
}

export default function CategoryGroup({
  category,
  info,
  types,
  selectedType,
  onSelectType,
}: CategoryGroupProps) {
  return (
    <div>
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div
          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl ${info.bgColor} ${info.textColor} flex items-center justify-center`}
        >
          <span className="text-xl">{info.iconText}</span>
        </div>
        <Title level={4} className="!mb-0 !text-base md:!text-xl">
          {info.label}
        </Title>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {types.map((type) => (
          <QuestionTypeCard
            key={type.value}
            type={type}
            selected={selectedType === type.value}
            onSelect={onSelectType}
          />
        ))}
      </div>
    </div>
  );
}

