import { cookies } from "next/headers";

import { defaultLocale, isLocale } from "@/lib/i18n/config";

export async function getLocale() {
  const cookieStore = cookies();
  const locale = cookieStore.get("waslah-locale")?.value;

  if (locale && isLocale(locale)) {
    return locale;
  }

  return defaultLocale;
}
