import React from "react";
import { getNoteTree } from "@/src/api/note";
import NoteSideBar from "./components/NoteSideBar";

export default async function NoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const noteTree = await getNoteTree();

  return (
    <section className="max-w-[1600px] mx-auto p-4 flex flex-col xl:flex-row xl:items-start">
      <div className="hidden xl:block xl:sticky xl:top-20 xl:self-start">
        <NoteSideBar noteTree={noteTree} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </section>
  );
}
