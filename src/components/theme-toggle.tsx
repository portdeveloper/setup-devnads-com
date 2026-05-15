"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export function ThemeToggle({ ariaLabel }: { ariaLabel: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable; theme stays in-memory for the session
    }
  };

  // Avoid an icon flip on first paint before we've synced with the
  // pre-paint script's result.
  const Icon = mounted && theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={ariaLabel}
      className="inline-flex h-7 w-7 items-center justify-center border transition-colors hover:bg-[var(--panel-hi)]"
      style={{ borderColor: "var(--line)", color: "var(--dim)" }}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
