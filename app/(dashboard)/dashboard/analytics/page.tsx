import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { resolveLocalizedText } from "@/lib/i18n/config";

export default async function AnalyticsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t.common.analytics}</h1>
        <p className="mt-2 text-muted-foreground">{t.dashboard.overviewSubtitle}</p>
      </div>
      <AnalyticsChart data={snapshot.metrics.revenueSeries} description={t.dashboard.monthlyRevenue} title={t.common.analytics} />
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.bestSellers}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {snapshot.metrics.bestSellingProducts.map((product) => (
            <div className="rounded-2xl border border-border/70 p-4" key={product.productId}>
              <div className="font-semibold">{resolveLocalizedText(product.name, locale)}</div>
              <div className="mt-2 text-sm text-muted-foreground">{product.units}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
