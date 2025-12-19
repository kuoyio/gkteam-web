"use client";

import { useState } from "react";
import { Typography, Card, Drawer, FloatButton } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { NoteTypeWithNotesResponse, SimpleNote } from "@/src/type";
import NoteList from "./NoteList";
import NoteContentCard from "./NoteContentCard";
import NoteNavigation from "./NoteNavigation";

const { Text } = Typography;

interface NotePageContentProps {
  currentNoteType: NoteTypeWithNotesResponse;
  currentNote: SimpleNote;
}

export default function NotePageContent({
  currentNoteType,
  currentNote,
}: NotePageContentProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const prevNote = currentNoteType.notes.find(
    (_, index) => currentNoteType.notes[index + 1]?.id === currentNote.id,
  );
  const nextNote = currentNoteType.notes.find(
    (_, index) => currentNoteType.notes[index - 1]?.id === currentNote.id,
  );

  return (
    <>
      <div className="flex items-start gap-6">
        <div className="hidden lg:block w-72 shrink-0">
          <Card
            title={currentNoteType.name}
            className="sticky"
            styles={{
              header: { fontSize: 16, fontWeight: 600 },
              body: {
                padding: "8px 0",
                maxHeight: "calc(100vh - 180px)",
                overflowY: "auto",
              },
            }}
          >
            <NoteList
              notes={currentNoteType.notes}
              currentNoteId={currentNote.id}
            />
          </Card>
        </div>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <Text strong className="text-lg">
              {currentNoteType.name}
            </Text>
            <Text
              className="text-ant-blue-500 cursor-pointer"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuOutlined className="mr-1" />
              目录
            </Text>
          </div>
          <NoteContentCard note={currentNote} />
          <NoteNavigation prevNote={prevNote} nextNote={nextNote} />
        </div>
      </div>

      <Drawer
        title={currentNoteType.name}
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        className="lg:hidden"
        styles={{
          wrapper: { width: 280 },
          body: { padding: "8px 0" },
        }}
      >
        <NoteList
          notes={currentNoteType.notes}
          currentNoteId={currentNote.id}
          onItemClick={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}
