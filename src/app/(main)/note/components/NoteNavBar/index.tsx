"use client";

import React, { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined, RightOutlined } from "@ant-design/icons";
import { NoteTreeResponse } from "@/src/type";
import SideBarItem from "../NoteSideBar/SideBarItem";
import NoteToc from "../NoteToc";

interface NoteNavBarProps {
  noteTree: NoteTreeResponse[];
  content: string;
}

export function NoteNavBar({ noteTree, content }: NoteNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-2 border-b border-ant-grey-200 bg-white sticky top-16 z-10">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 text-ant-grey-700 hover:text-ant-blue-500 transition-colors"
        >
          <MenuOutlined />
          <span>文章列表</span>
        </button>

        <button
          onClick={() => setTocOpen(true)}
          className="flex items-center gap-1 text-ant-grey-700 hover:text-ant-blue-500 transition-colors"
        >
          <span>本页目录</span>
          <RightOutlined className="text-xs" />
        </button>
      </div>

      <Drawer
        title="文章列表"
        placement="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        width={300}
        styles={{ body: { padding: 0 } }}
      >
        <nav className="flex flex-col p-2">
          {noteTree.map((item) => (
            <SideBarItem key={item.id} item={item} level={0} />
          ))}
        </nav>
      </Drawer>

      <Drawer
        title="本页目录"
        placement="right"
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        width={280}
        styles={{ body: { padding: "8px" } }}
      >
        <NoteToc content={content} inDrawer />
      </Drawer>
    </>
  );
}

export default NoteNavBar;
