import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { requireDashboardUser } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { resolveLocalizedText } from "@/lib/i18n/config";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const context = await requireDashboardUser();
  const snapshot = await getDashboardSnapshot();
  const business = snapshot.business || context.dashboard?.business || null;
  const publicStoreUrl = business ? `/store/${business.slug}` : "/store/cakehouse";

  return (
    <div className="section-shell py-6">
      <div className="flex gap-6">
        <DashboardSidebar locale={locale} role={context.profile.role} />
        <div className="min-w-0 flex-1">
          <div className="surface mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{t.common.appName}</div>
              <div className="text-xl font-semibold">
                {business ? resolveLocalizedText(business.name, locale) : t.common.dashboard}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <LanguageSwitcher locale={locale} redirectTo="/dashboard" />
              <Button asChild variant="outline">
                <Link href={publicStoreUrl}>
                  <ExternalLink className="h-4 w-4" />
                  {t.dashboard.publicStore}
                </Link>
              </Button>
              <form action="/api/auth/sign-out" method="post">
                <Button type="submit" variant="ghost">
                  {t.common.signOut}
                </Button>
              </form>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
