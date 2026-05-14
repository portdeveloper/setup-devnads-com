export const LOCALES = ["en", "tr"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "tr";
}
