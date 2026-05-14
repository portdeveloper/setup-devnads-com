import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

function pickLocaleFromHeader(header: string | null): string {
  if (!header) return DEFAULT_LOCALE;
  // Accept-Language is "tr-TR,tr;q=0.9,en;q=0.8". Take the first 2-char tag
  // that matches one of our locales.
  for (const entry of header.split(",")) {
    const tag = entry.trim().split(";")[0].slice(0, 2).toLowerCase();
    if ((LOCALES as readonly string[]).includes(tag)) return tag;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = pickLocaleFromHeader(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals + static assets.
  matcher: ["/((?!_next/|favicon\\.ico|.*\\.[a-z0-9]+$).*)"],
};
