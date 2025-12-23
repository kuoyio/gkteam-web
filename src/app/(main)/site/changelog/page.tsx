import React from "react";
import type { Metadata } from "next";
import { Timeline, Tag, Empty } from "antd";
import Link from "next/link";
import { getChangelogs } from "@/src/api/changelog";
import {
  ChangelogResponse,
  ChangeItem,
  Changes,
} from "@/src/type/changelog";

export const metadata: Metadata = {
  title: "更新日志 - 公考小分队",
  description: "公考小分队网站更新日志，记录我们的每一次进步。",
};

type ChangeType = keyof Changes;

const typeConfig: Record<ChangeType, { label: string; color: string }> = {
  updated: { label: "更新", color: "blue" },
  enhanced: { label: "优化", color: "green" },
  fixed: { label: "修复", color: "red" },
  deleted: { label: "移除", color: "orange" },
};

const renderChangeItem = (item: ChangeItem) => {
  if (item.link) {
    return (
      <Link
        href={item.link}
        className="text-ant-blue-500 hover:text-ant-blue-600 hover:underline transition-colors"
      >
        {item.text}
      </Link>
    );
  }
  return <span>{item.text}</span>;
};

const flattenChanges = (changes: Changes) => {
  const result: { type: ChangeType; item: ChangeItem }[] = [];

  (Object.keys(typeConfig) as ChangeType[]).forEach((type) => {
    const items = changes[type];
    if (items && items.length > 0) {
      items.forEach((item) => {
        result.push({ type, item });
      });
    }
  });

  return result;
};

export default async function ChangelogPage() {
  let changelogs: ChangelogResponse[] = [];

  try {
    changelogs = await getChangelogs();
  } catch (error) {
    console.error("Failed to fetch changelogs:", error);
  }

  if (changelogs.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 text-ant-grey-800">更新日志</h1>
        <p className="text-ant-grey-500 mb-10">
          公考小分队的每一次迭代，都离不开大家的支持与反馈。
        </p>
        <Empty description="暂无更新日志" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-ant-grey-800">更新日志</h1>
      <p className="text-ant-grey-500 mb-10">
        公考小分队的每一次迭代，都离不开大家的支持与反馈。
      </p>

      <Timeline
        items={changelogs.map((changelog, idx) => {
          const changesList = flattenChanges(changelog.changes);

          return {
            key: changelog.id,
            content: (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-bold text-ant-grey-800 flex items-center gap-2">
                    {changelog.version}
                    {idx === 0 && <Tag color="processing">最新</Tag>}
                  </h2>
                  <span className="text-ant-grey-400 font-mono text-sm">
                    {changelog.releaseDate}
                  </span>
                </div>
                <ul className="list-none p-0 space-y-3">
                  {changesList.map((change, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Tag
                        color={typeConfig[change.type].color}
                        className="mt-0.5 flex-shrink-0"
                      >
                        {typeConfig[change.type].label}
                      </Tag>
                      <span className="text-ant-grey-700 leading-relaxed">
                        {renderChangeItem(change.item)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          };
        })}
      />
    </div>
  );
}
