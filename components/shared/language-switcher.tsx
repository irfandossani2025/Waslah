import Link from "next/link";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/types/domain";

export function LanguageSwitcher({ locale, redirectTo = "/" }: { locale: Locale; redirectTo?: string }) {
  const nextLocale = locale === "en" ? "ar" : "en";

  return (
    <Button asChild className="rounded-full" variant="outline">
      <Link href={`/api/locale?locale=${nextLocale}&redirect=${encodeURIComponent(redirectTo)}`}>
        <Globe className="h-4 w-4" />
        {locale === "en" ? "العربية" : "English"}
      </Link>
    </Button>
  );
}
