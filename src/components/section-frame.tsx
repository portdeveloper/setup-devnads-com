import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section Frame: structural region marker per the MDS-2026 Decorative
 * vocabulary (devnads-blitz-com/design.md). 1px border on all sides,
 * 4x4px corner-squares at the four corners, both in `--line`. Used to
 * delineate stacked sections within a page without inventing new chrome.
 *
 * Corner-squares are reserved for Section Frame. Don't use this decoration
 * on cards, callouts, or anything else.
 */
type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionFrame({ children, className }: Props) {
  return (
    <section
      className={cn("relative border", className)}
      style={{ borderColor: "var(--line)" }}
    >
      <CornerSquare className="top-[-2px] left-[-2px]" />
      <CornerSquare className="top-[-2px] right-[-2px]" />
      <CornerSquare className="bottom-[-2px] left-[-2px]" />
      <CornerSquare className="bottom-[-2px] right-[-2px]" />
      {children}
    </section>
  );
}

function CornerSquare({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn("absolute h-1 w-1", className)}
      style={{ background: "var(--line)" }}
    />
  );
}
