import Link from "next/link";

import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/domain";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-border/70 bg-white/70 py-8">
      <div className="section-shell flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>{t.common.appName} © 2026</div>
        <div className="flex gap-4">
          <Link href="#pricing">{t.nav.pricing}</Link>
          <Link href="#faq">{t.nav.faq}</Link>
          <Link href="/signup">{t.common.startSelling}</Link>
        </div>
      </div>
    </footer>
  );
}
