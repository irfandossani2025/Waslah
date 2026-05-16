import Link from "next/link";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/domain";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link className="text-lg font-semibold tracking-tight text-foreground" href="/">
          {t.common.appName}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="#features">{t.nav.features}</Link>
          <Link href="#pricing">{t.nav.pricing}</Link>
          <Link href="#faq">{t.nav.faq}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} redirectTo="/" />
          <Button asChild variant="ghost">
            <Link href="/login">{t.nav.signIn}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{t.nav.getStarted}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
