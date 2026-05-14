"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  language?: string;
  children: string;
  className?: string;
};

export function CodeBlock({ language = "bash", children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard access denied; do nothing
    }
  };

  return (
    <div
      className={cn(
        "border",
        className,
      )}
      style={{
        background: "var(--code-bg)",
        borderColor: "var(--code-border)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-3 h-10"
        style={{
          background: "var(--code-bg-header)",
          borderColor: "var(--code-border)",
        }}
      >
        <span
          className="font-mono uppercase tracking-[0.15em] text-[10px]"
          style={{ color: "var(--code-meta)" }}
        >
          {language}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="font-mono uppercase tracking-[0.15em] text-[10px] inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
          style={{ color: "var(--code-meta)" }}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-[21px]"
        style={{ color: "var(--code-text)" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
