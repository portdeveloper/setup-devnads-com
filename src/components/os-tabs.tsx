"use client";

import { cn } from "@/lib/utils";

export type Os = "windows" | "mac" | "linux";

const OPTIONS: { value: Os; label: string }[] = [
  { value: "windows", label: "Windows" },
  { value: "mac", label: "macOS" },
  { value: "linux", label: "Linux" },
];

type Props = {
  value: Os;
  onChange: (value: Os) => void;
};

export function OsTabs({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Operating system"
      className="inline-flex border"
      style={{ borderColor: "var(--line)" }}
    >
      {OPTIONS.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "font-mono uppercase tracking-[0.12em] text-[11px] px-4 py-2 transition-colors",
              i > 0 && "border-l",
            )}
            style={{
              borderColor: "var(--line)",
              background: active ? "var(--brand)" : "transparent",
              color: active ? "var(--on-brand)" : "var(--dim)",
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = "var(--dim)";
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
