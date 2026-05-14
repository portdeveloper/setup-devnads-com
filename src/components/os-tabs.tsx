"use client";

import { cn } from "@/lib/utils";

export type Os = "windows" | "mac" | "linux";

const ORDER: Os[] = ["windows", "mac", "linux"];

type Props = {
  value: Os;
  onChange: (value: Os) => void;
  labels: Record<Os, string>;
};

export function OsTabs({ value, onChange, labels }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Operating system"
      className="inline-flex border"
      style={{ borderColor: "var(--line)" }}
    >
      {ORDER.map((os, i) => {
        const active = os === value;
        return (
          <button
            key={os}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(os)}
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
            {labels[os]}
          </button>
        );
      })}
    </div>
  );
}
