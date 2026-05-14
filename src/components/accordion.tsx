"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b" style={{ borderColor: "var(--line)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[var(--panel)]"
      >
        <span className="text-sm" style={{ color: "var(--text)" }}>
          {title}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform"
          style={{
            color: "var(--dim)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <div
          className="px-6 pb-5 text-sm leading-relaxed"
          style={{ color: "var(--dim)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return (
    <div className="border-t" style={{ borderColor: "var(--line)" }}>
      {children}
    </div>
  );
}
