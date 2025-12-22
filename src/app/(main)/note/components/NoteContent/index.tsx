"use client";

import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import MarkdownRender from "@/src/components/MarkdownRender";

interface NoteContentProps {
  title: string;
  content: string;
  updatedTime: string;
}

export function NoteContent({ title, content, updatedTime }: NoteContentProps) {
  return (
    <article className="flex-1 min-w-0 py-2">
      <header className="mb-8 pb-6 border-b border-ant-grey-200">
        <h1 className="text-3xl font-bold text-ant-grey-800 mb-4">{title}</h1>
        <div className="flex items-center gap-1.5 text-sm text-ant-grey-500">
          <CalendarOutlined />
          <span>最近更新</span>
          <time>{updatedTime}</time>
        </div>
      </header>

      <div className="prose max-w-none">
        <MarkdownRender content={content} />
      </div>
    </article>
  );
}

export default NoteContent;
