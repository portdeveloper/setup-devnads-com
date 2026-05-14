"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABEL, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function swapLocale(pathname: string, locale: Locale): string {
  // Replace the leading /<locale> segment, or prepend if absent.
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${locale}`;
  const isLocaleHead = (LOCALES as readonly string[]).includes(segments[0]);
  const rest = isLocaleHead ? segments.slice(1) : segments;
  return `/${locale}${rest.length ? "/" + rest.join("/") : ""}`;
}

export function LangSwitch({
  current,
  ariaLabel,
}: {
  current: Locale;
  ariaLabel: string;
}) {
  const pathname = usePathname() || "/";
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex border"
      style={{ borderColor: "var(--line)" }}
    >
      {LOCALES.map((l, i) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={swapLocale(pathname, l)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "font-mono uppercase tracking-[0.12em] text-[10px] px-2.5 py-1 transition-colors",
              i > 0 && "border-l",
            )}
            style={{
              borderColor: "var(--line)",
              background: active ? "var(--brand)" : "transparent",
              color: active ? "var(--on-brand)" : "var(--dim)",
            }}
          >
            {LOCALE_LABEL[l]}
          </Link>
        );
      })}
    </div>
  );
}
