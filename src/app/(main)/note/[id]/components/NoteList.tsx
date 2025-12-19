import Link from "next/link";
import { SimpleNote } from "@/src/type";

interface NoteListProps {
  notes: SimpleNote[];
  currentNoteId: string;
  onItemClick?: () => void;
}

export default function NoteList({
  notes,
  currentNoteId,
  onItemClick,
}: NoteListProps) {
  return (
    <div>
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/note/${note.id}`}
          className="block"
          onClick={onItemClick}
        >
          <div
            className={`
              px-4 py-3 transition-all duration-150 border-l-3
              ${
                currentNoteId === note.id
                  ? "bg-ant-blue-50 text-ant-blue-500 border-l-ant-blue-500"
                  : "text-ant-grey-700 hover:bg-ant-grey-50 border-l-transparent"
              }
            `}
          >
            <span className="text-sm">{note.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

