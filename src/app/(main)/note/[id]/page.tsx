import React from "react";
import { notFound } from "next/navigation";
import { getNoteTree } from "@/src/api/note";
import { NoteTreeResponse, NoteType } from "@/src/type";
import NoteContent from "../components/NoteContent";
import NoteToc from "../components/NoteToc";
import NoteNavBar from "../components/NoteNavBar";

export const dynamic = "force-static";
export const dynamicParams = false;

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

function findNoteById(
  nodes: NoteTreeResponse[],
  id: string
): NoteTreeResponse | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const found = findNoteById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function collectArticleIds(
  nodes: NoteTreeResponse[],
  result: { id: string }[] = []
): { id: string }[] {
  for (const node of nodes) {
    if (node.type === NoteType.ARTICLE) {
      result.push({ id: node.id });
    }
    if (node.children && node.children.length > 0) {
      collectArticleIds(node.children, result);
    }
  }
  return result;
}

export async function generateStaticParams() {
  const noteTree = await getNoteTree();
  return collectArticleIds(noteTree);
}

export async function generateMetadata({ params }: NoteDetailPageProps) {
  const { id } = await params;
  const noteTree = await getNoteTree();
  const note = findNoteById(noteTree, id);

  if (!note) {
    return { title: "文章未找到 - 公考小分队" };
  }

  return {
    title: `${note.title} - 公考小分队`,
    description: note.content?.slice(0, 160) || note.title,
  };
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id } = await params;
  const noteTree = await getNoteTree();
  const note = findNoteById(noteTree, id);

  if (!note) {
    notFound();
  }

  const content = note.content || "";

  return (
    <>
      <div className="xl:hidden">
        <NoteNavBar noteTree={noteTree} content={content} />
      </div>
      <div className="flex flex-1">
        <NoteContent
          title={note.title}
          content={content}
          updatedTime={note.updatedTime}
        />
        <div className="hidden xl:block xl:sticky xl:top-20 xl:self-start">
          <NoteToc content={content} />
        </div>
      </div>
    </>
  );
}
