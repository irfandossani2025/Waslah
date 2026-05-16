import type { Locale, LocalizedText } from "@/types/domain";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ar"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale] || value.en;
}
