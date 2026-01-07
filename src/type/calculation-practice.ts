export type QuestionType =
  | "TWO_DIGIT_ADDITION"
  | "TWO_DIGIT_SUBTRACTION"
  | "THREE_DIGIT_ADDITION"
  | "THREE_DIGIT_SUBTRACTION"
  | "THREE_DIGIT_ADDITION_SUBTRACTION"
  | "TWO_DIGIT_MULTIPLICATION"
  | "THREE_DIGIT_MULTIPLICATION"
  | "THREE_DIGIT_DIVIDED_BY_TWO_DIGIT"
  | "FIVE_DIGIT_DIVIDED_BY_THREE_DIGIT"
  | "COMMON_SQUARE_NUMBERS"
  | "COMMON_CUBE_NUMBERS"
  | "COMMON_PYTHAGOREAN_TRIPLE";

export type QuestionCategory =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "power";

export interface QuestionTypeConfig {
  value: QuestionType;
  label: string;
  description: string;
  category: QuestionCategory;
}

export interface CategoryInfo {
  label: string;
  color: string;
  iconText: string;
  bgColor: string;
  textColor: string;
}

export const QUESTION_TYPE_CONFIGS: QuestionTypeConfig[] = [
  {
    value: "TWO_DIGIT_ADDITION",
    label: "两位数加法",
    description: "45 + 67",
    category: "addition",
  },
  {
    value: "TWO_DIGIT_SUBTRACTION",
    label: "两位数减法",
    description: "89 - 34",
    category: "subtraction",
  },
  {
    value: "THREE_DIGIT_ADDITION",
    label: "三位数加法",
    description: "456 + 789",
    category: "addition",
  },
  {
    value: "THREE_DIGIT_SUBTRACTION",
    label: "三位数减法",
    description: "876 - 543",
    category: "subtraction",
  },
  {
    value: "THREE_DIGIT_ADDITION_SUBTRACTION",
    label: "三位数加减混合",
    description: "随机加或减",
    category: "addition",
  },
  {
    value: "TWO_DIGIT_MULTIPLICATION",
    label: "两位数乘两位数",
    description: "23 × 45",
    category: "multiplication",
  },
  {
    value: "THREE_DIGIT_MULTIPLICATION",
    label: "三位数乘两位数",
    description: "123 × 45",
    category: "multiplication",
  },
  {
    value: "THREE_DIGIT_DIVIDED_BY_TWO_DIGIT",
    label: "三位数÷两位数",
    description: "456 ÷ 78 (±3%)",
    category: "division",
  },
  {
    value: "FIVE_DIGIT_DIVIDED_BY_THREE_DIGIT",
    label: "五位数÷三位数",
    description: "12345 ÷ 123 (±3%)",
    category: "division",
  },
  {
    value: "COMMON_SQUARE_NUMBERS",
    label: "常见平方数",
    description: "15²",
    category: "power",
  },
  {
    value: "COMMON_CUBE_NUMBERS",
    label: "常见立方数",
    description: "8³",
    category: "power",
  },
  {
    value: "COMMON_PYTHAGOREAN_TRIPLE",
    label: "常见勾股数",
    description: "3² + 4² = ?²",
    category: "power",
  },
];

export const CATEGORY_INFO: Record<QuestionCategory, CategoryInfo> = {
  addition: {
    label: "加法",
    color: "green",
    iconText: "＋",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  subtraction: {
    label: "减法",
    color: "orange",
    iconText: "－",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  multiplication: {
    label: "乘法",
    color: "blue",
    iconText: "×",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  division: {
    label: "除法",
    color: "purple",
    iconText: "÷",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  power: {
    label: "乘方",
    color: "magenta",
    iconText: "ⁿ",
    bgColor: "bg-magenta-50",
    textColor: "text-magenta-600",
  },
};

export const COMMON_COUNTS = [10, 20, 30, 50];

export interface Question {
  questionIndex: number;
  content: string;
}

export interface GeneratePracticeRequest {
  questionType: QuestionType;
  count: number;
}

export interface GeneratePracticeResponse {
  sessionId: string;
  questionType: QuestionType;
  questionTypeDescription: string;
  questions: Question[];
}

export interface AnswerItem {
  questionIndex: number;
  answer: string;
  spentTime: number;
}

export interface SubmitPracticeRequest {
  sessionId: string;
  totalSpentTime: number;
  answers: AnswerItem[];
}

export interface QuestionResult {
  questionIndex: number;
  questionType: QuestionType;
  category: string;
  content: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  spentTime: number;
}

export interface PracticeResult {
  id: string;
  questionType: QuestionType;
  questionTypeDescription: string;
  totalSpentTime: number;
  totalCount: number;
  correctCount: number;
  accuracy: string;
  questionResults: QuestionResult[];
  submittedAt: string;
}
