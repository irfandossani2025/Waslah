import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";

import "@/app/globals.css";

import { AppToaster } from "@/components/shared/toaster";
import { cn } from "@/lib/utils";
import { getLocale } from "@/lib/i18n/get-locale";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waslah.app"),
  title: "Waslah | WhatsApp-first ordering for Oman and GCC sellers",
  description:
    "Waslah helps Instagram and WhatsApp businesses in Oman organize catalogs, storefronts, and orders.",
  openGraph: {
    title: "Waslah",
    description: "WhatsApp-first ordering for small businesses.",
    type: "website"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} suppressHydrationWarning>
      <body className={cn(sans.variable, arabic.variable, locale === "ar" ? "font-arabic" : "font-sans")}>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
