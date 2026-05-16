import { EmptyState } from "@/components/shared/empty-state";
import { StatusPill } from "@/components/shared/status-pill";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSnapshot } from "@/lib/data/queries";
import { requireDashboardUser } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { resolveLocalizedText } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/utils";

export default async function AdminPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const context = await requireDashboardUser();

  if (context.profile.role !== "admin") {
    return (
      <EmptyState
        description={locale === "en" ? "This area is reserved for platform admins." : "هذه المنطقة مخصصة لإدارة المنصة."}
        title={t.common.admin}
      />
    );
  }

  const snapshot = await getAdminSnapshot();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t.dashboard.adminTitle}</h1>
        <p className="mt-2 text-muted-foreground">{t.dashboard.adminSubtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>{t.admin.platformMetrics}</CardDescription>
            <CardTitle>{snapshot.metrics.totalBusinesses}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>{t.admin.activeStores}</CardDescription>
            <CardTitle>{snapshot.metrics.activeBusinesses}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>{t.admin.monthlyGMV}</CardDescription>
            <CardTitle>{formatCurrency(snapshot.metrics.monthlyGMV, "OMR", locale)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>{t.admin.subscriptions}</CardDescription>
            <CardTitle>{snapshot.metrics.premiumCount + snapshot.metrics.businessCount + snapshot.metrics.starterCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.common.admin}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {snapshot.businesses.map((business) => (
            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between" key={business.id}>
              <div>
                <div className="font-semibold">{resolveLocalizedText(business.name, locale)}</div>
                <div className="text-sm text-muted-foreground">@{business.slug}</div>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill locale={locale} status={business.status} />
                <div className="text-sm text-muted-foreground">{t.plans[business.plan].name}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
