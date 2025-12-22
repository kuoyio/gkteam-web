"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import { NoteTreeResponse, NoteType } from "@/src/type";
import DynamicIcon from "@/src/components/DynamicIcon";

interface SideBarItemProps {
  item: NoteTreeResponse;
  level: number;
}

export function SideBarItem({ item, level }: SideBarItemProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const hasChildren = item.children && item.children.length > 0;
  const isArticle = item.type === NoteType.ARTICLE;
  const isActive = pathname === `/note/${item.id}`;

  const paddingLeft = level * 16 + 12;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const itemContent = (
    <div
      className={`
        flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer
        transition-all duration-200 group
        ${isActive 
          ? "bg-ant-blue-50 text-ant-blue-500 font-medium" 
          : "text-ant-grey-700 hover:bg-ant-grey-100"
        }
      `}
      style={{ paddingLeft }}
    >
      {!isArticle && item.icon && (
        <span className={`text-base flex-shrink-0 ${isActive ? "text-ant-blue-500" : "text-ant-grey-500"}`}>
          <DynamicIcon name={item.icon} />
        </span>
      )}

      <span className="flex-1 truncate text-sm">{item.title}</span>

      {hasChildren && (
        <span
          onClick={handleToggle}
          className={`
            text-xs flex-shrink-0 p-1 rounded transition-colors
            ${isActive ? "text-ant-blue-400" : "text-ant-grey-400"}
            hover:bg-ant-grey-200
          `}
        >
          {isExpanded ? <DownOutlined /> : <RightOutlined />}
        </span>
      )}
    </div>
  );

  return (
    <div>
      {isArticle ? (
        <Link href={`/note/${item.id}`} className="block no-underline">
          {itemContent}
        </Link>
      ) : (
        <div onClick={hasChildren ? handleToggle : undefined}>
          {itemContent}
        </div>
      )}

      {hasChildren && isExpanded && (
        <div className="flex flex-col">
          {item.children.map((child) => (
            <SideBarItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SideBarItem;
