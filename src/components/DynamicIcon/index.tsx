"use client";

import React from "react";
import * as Icons from "@ant-design/icons";

type IconName = keyof typeof Icons;

interface DynamicIconProps {
  name: IconName | string | null | undefined;
  className?: string;
  style?: React.CSSProperties;
}

export function DynamicIcon({ name, className, style }: DynamicIconProps) {
  if (!name) return null;

  const IconComponent = Icons[name as IconName] as React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;

  if (!IconComponent) return null;

  return <IconComponent className={className} style={style} />;
}

export default DynamicIcon;

