import { Typography, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SimpleNote } from "@/src/type";

const { Title } = Typography;

interface NoteContentCardProps {
  note: SimpleNote;
}

export default function NoteContentCard({ note }: NoteContentCardProps) {
  return (
    <Card>
      <div className="mb-6 pb-4 border-b border-ant-grey-200">
        <Title level={3} className="!mb-2">
          {note.title}
        </Title>
        <div className="flex items-center gap-1 text-ant-grey-400 text-sm">
          <ClockCircleOutlined />
          <span>更新于 {note.updatedTime}</span>
        </div>
      </div>

      <article className="prose prose-slate max-w-none prose-headings:text-ant-grey-800 prose-p:text-ant-grey-600 prose-a:text-ant-blue-500 prose-code:text-ant-magenta-500 prose-code:bg-ant-grey-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ant-grey-900 prose-pre:text-ant-grey-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
      </article>
    </Card>
  );
}

