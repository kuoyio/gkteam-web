import Link from "next/link";
import { Typography, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SimpleNote } from "@/src/type";

const { Text } = Typography;

interface NoteNavigationProps {
  prevNote?: SimpleNote;
  nextNote?: SimpleNote;
}

export default function NoteNavigation({
  prevNote,
  nextNote,
}: NoteNavigationProps) {
  if (!prevNote && !nextNote) {
    return null;
  }

  return (
    <div className="mt-6 flex gap-4">
      {prevNote ? (
        <Link href={`/note/${prevNote.id}`} className="flex-1">
          <Card size="small" hoverable className="h-full">
            <div className="text-xs text-ant-grey-400 mb-1">
              <LeftOutlined className="mr-1" />
              上一篇
            </div>
            <Text className="text-sm" ellipsis>
              {prevNote.title}
            </Text>
          </Card>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {nextNote ? (
        <Link href={`/note/${nextNote.id}`} className="flex-1">
          <Card size="small" hoverable className="h-full text-right">
            <div className="text-xs text-ant-grey-400 mb-1">
              下一篇
              <RightOutlined className="ml-1" />
            </div>
            <Text className="text-sm" ellipsis>
              {nextNote.title}
            </Text>
          </Card>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

