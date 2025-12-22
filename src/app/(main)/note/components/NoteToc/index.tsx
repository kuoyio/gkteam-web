"use client";

import React, { useEffect, useState } from "react";
import { Anchor } from "antd";

interface TocItem {
  key: string;
  href: string;
  title: string;
  children?: TocItem[];
}

interface NoteTocProps {
  content: string;
  inDrawer?: boolean;
}

export function NoteToc({ content, inDrawer = false }: NoteTocProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const items = extractHeadings(content);
    setTocItems(items);
  }, [content]);

  if (tocItems.length === 0) {
    return null;
  }

  if (inDrawer) {
    return (
      <Anchor
        affix={false}
        offsetTop={80}
        items={tocItems}
        className="toc-anchor"
      />
    );
  }

  return (
    <aside className="w-[240px] max-h-[calc(100vh-96px)] pl-4 overflow-y-auto">
      <div className="text-sm font-medium text-ant-grey-600 mb-3 px-2">
        目录
      </div>
      <Anchor
        affix={false}
        offsetTop={80}
        items={tocItems}
        className="toc-anchor"
      />
    </aside>
  );
}

function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fa5-]/g, "");

    headings.push({ level, text, id });
  }

  return buildTocTree(headings);
}

function buildTocTree(
  headings: { level: number; text: string; id: string }[],
): TocItem[] {
  const result: TocItem[] = [];
  const stack: { level: number; item: TocItem; children: TocItem[] }[] = [];

  for (const heading of headings) {
    const item: TocItem = {
      key: heading.id,
      href: `#${heading.id}`,
      title: heading.text,
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      result.push(item);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.item.children) {
        parent.item.children = [];
      }
      parent.item.children.push(item);
    }

    stack.push({ level: heading.level, item, children: [] });
  }

  return result;
}

export default NoteToc;
