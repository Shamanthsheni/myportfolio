"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content) return null;

  // Split lines into blocks
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = "";
  let inList: "ul" | "ol" | null = null;
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (!inList || listItems.length === 0) return;
    if (inList === "ul") {
      elements.push(
        <ul key={`list-${key}`} className="my-4 space-y-1.5 list-disc list-inside text-[#333A44]">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`list-${key}`} className="my-4 space-y-1.5 list-decimal list-inside text-[#333A44]">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    }
    inList = null;
    listItems = [];
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Match inline formatting: `code`, **bold**, *italic*, [text](url), $math$
    const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\$[^$]+\$)/g;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("`") && token.endsWith("`")) {
        parts.push(
          <code key={match.index} className="px-1.5 py-0.5 bg-[#F4F3EE] text-[#111418] rounded font-mono text-xs border border-[#E4E3DC]">
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(<strong key={match.index} className="font-semibold text-[#111418]">{token.slice(2, -2)}</strong>);
      } else if (token.startsWith("*") && token.endsWith("*")) {
        parts.push(<em key={match.index} className="italic">{token.slice(1, -1)}</em>);
      } else if (token.startsWith("$") && token.endsWith("$")) {
        parts.push(
          <span key={match.index} className="font-mono text-xs bg-[#F4F3EE] text-[#2563EB] px-1 py-0.5 rounded">
            {token.slice(1, -1)}
          </span>
        );
      } else if (token.startsWith("[") && token.includes("](")) {
        const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          parts.push(
            <a
              key={match.index}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline font-medium"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code blocks ```
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        flushList(`cb-${i}`);
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-lg overflow-hidden border border-[#E4E3DC] bg-[#181B20] text-[#F3F4F6]">
            {codeBlockLang && (
              <div className="px-4 py-1.5 bg-[#111418] text-[#8C96A5] font-mono text-[11px] border-b border-white/10 uppercase tracking-wider">
                {codeBlockLang}
              </div>
            )}
            <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
              <code>{codeBlockContent.join("\n")}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLang = "";
      } else {
        flushList(`pre-cb-${i}`);
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, "").trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Horizontal rule ---
    if (line.trim() === "---" || line.trim() === "***") {
      flushList(`hr-${i}`);
      elements.push(<hr key={`hr-${i}`} className="my-8 border-[#E4E3DC]" />);
      continue;
    }

    // Headings
    if (line.startsWith("#### ")) {
      flushList(`h4-${i}`);
      elements.push(
        <h4 key={`h4-${i}`} className="text-base font-serif font-medium text-[#111418] mt-6 mb-2">
          {renderInline(line.replace(/^####\s+/, ""))}
        </h4>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList(`h3-${i}`);
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg md:text-xl font-serif font-medium text-[#111418] mt-8 mb-3">
          {renderInline(line.replace(/^###\s+/, ""))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList(`h2-${i}`);
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl md:text-2xl font-serif font-medium text-[#111418] mt-10 mb-4 pb-2 border-b border-[#EAE9E2]">
          {renderInline(line.replace(/^##\s+/, ""))}
        </h2>
      );
      continue;
    }
    if (line.startsWith("# ")) {
      flushList(`h1-${i}`);
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl md:text-3xl font-serif font-medium text-[#111418] mt-10 mb-4">
          {renderInline(line.replace(/^#\s+/, ""))}
        </h1>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      flushList(`bq-${i}`);
      elements.push(
        <blockquote key={`bq-${i}`} className="my-6 pl-4 border-l-2 border-[#111418] italic text-[#5F6978] bg-[#F4F3EE]/50 py-2 rounded-r">
          {renderInline(line.replace(/^>\s+/, ""))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      if (inList !== "ul") {
        flushList(`pre-ul-${i}`);
        inList = "ul";
      }
      listItems.push(line.trim().replace(/^[-*]\s+/, ""));
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line.trim())) {
      if (inList !== "ol") {
        flushList(`pre-ol-${i}`);
        inList = "ol";
      }
      listItems.push(line.trim().replace(/^\d+\.\s+/, ""));
      continue;
    }

    // Regular paragraph
    if (line.trim().length > 0) {
      flushList(`p-${i}`);
      elements.push(
        <p key={`p-${i}`} className="my-4 text-[#333A44] leading-relaxed text-sm md:text-base">
          {renderInline(line)}
        </p>
      );
    } else {
      flushList(`empty-${i}`);
    }
  }

  flushList("end");

  return <div className={`prose-editorial ${className}`}>{elements}</div>;
};
