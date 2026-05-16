import { NextResponse } from "next/server";

import { defaultLocale, isLocale } from "@/lib/i18n/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || defaultLocale;
  const redirectTo = searchParams.get("redirect") || "/";
  const safeLocale = isLocale(locale) ? locale : defaultLocale;

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set("waslah-locale", safeLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });

  return response;
}
