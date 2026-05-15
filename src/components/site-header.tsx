import Link from "next/link";
import { LangSwitch } from "@/components/lang-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.44-2.69 5.41-5.25 5.7.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.67.8.55 4.56-1.52 7.85-5.83 7.85-10.9C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function SiteHeader({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ background: "var(--bg)", borderColor: "var(--line)" }}
    >
      <div className="frame flex h-14 items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="font-mono uppercase tracking-[0.18em] text-xs transition-colors hover:text-[var(--dim)]"
          style={{ color: "var(--text)" }}
        >
          {dict.header.wordmark}
        </Link>
        <nav className="flex items-center gap-4 md:gap-5">
          <ThemeToggle ariaLabel={dict.themeToggle.aria} />
          <LangSwitch current={locale} ariaLabel={dict.langSwitch.aria} />
          <Link
            href="https://github.com/portdeveloper/se2-workshop-windows-setup"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline font-mono uppercase tracking-[0.12em] text-[11px] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            {dict.header.repo}
          </Link>
          <Link
            href="https://github.com/portdeveloper/se2-monad-extension"
            target="_blank"
            rel="noreferrer"
            aria-label={dict.header.githubAria}
            className="transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            <GithubMark className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
