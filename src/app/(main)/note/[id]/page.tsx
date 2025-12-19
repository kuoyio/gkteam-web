import { Suspense } from "react";
import { Spin } from "antd";
import { notFound } from "next/navigation";
import { getAllNoteTypesWithNotes } from "@/src/api/note_type";
import NotePageContent from "./components/NotePageContent";

export const dynamic = "force-static";
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const noteTypes = await getAllNoteTypesWithNotes().catch(() => []);

  const params: { id: string }[] = [];

  for (const noteType of noteTypes) {
    for (const note of noteType.notes) {
      params.push({ id: note.id });
    }
  }

  return params;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;

  const noteTypes = await getAllNoteTypesWithNotes().catch((error) => {
    console.error("Failed to fetch note types:", error);
    return [];
  });

  let currentNoteType = null;
  let currentNote = null;

  for (const noteType of noteTypes) {
    const note = noteType.notes.find((n) => n.id === id);
    if (note) {
      currentNoteType = noteType;
      currentNote = note;
      break;
    }
  }

  if (!currentNoteType || !currentNote) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Spin size="large" />
        </div>
      }
    >
      <NotePageContent
        currentNoteType={currentNoteType}
        currentNote={currentNote}
      />
    </Suspense>
  );
}

