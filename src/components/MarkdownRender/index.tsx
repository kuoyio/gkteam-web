"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./styles.module.scss";

interface MarkdownRenderProps {
  content: string;
}

export function MarkdownRender({ content }: MarkdownRenderProps) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 id={generateId(children)} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 id={generateId(children)} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 id={generateId(children)} {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 id={generateId(children)} {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 id={generateId(children)} {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 id={generateId(children)} {...props}>
              {children}
            </h6>
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            return isInline ? (
              <code className={styles.inlineCode} {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre className={styles.codeBlock} {...props}>
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className={styles.tableWrapper}>
              <table {...props}>{children}</table>
            </div>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className={styles.blockquote} {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function generateId(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "");
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
    return extractText(node.props.children);
  }
  return "";
}

export default MarkdownRender;

