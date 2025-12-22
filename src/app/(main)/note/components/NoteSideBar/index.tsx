"use client";

import React from "react";
import { NoteTreeResponse } from "@/src/type";
import SideBarItem from "./SideBarItem";

interface NoteSideBarProps {
  noteTree: NoteTreeResponse[];
}

export function NoteSideBar({ noteTree }: NoteSideBarProps) {
  return (
    <aside className="w-[280px] max-h-[calc(100vh-96px)] overflow-y-auto pr-4">
      <nav className="flex flex-col">
        {noteTree.map((item) => (
          <SideBarItem key={item.id} item={item} level={0} />
        ))}
      </nav>
    </aside>
  );
}

export default NoteSideBar;
