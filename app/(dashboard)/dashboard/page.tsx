import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { OrdersBoard } from "@/components/dashboard/orders-board";
import { ProductsBoard } from "@/components/dashboard/products-board";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSnapshot } from "@/lib/data/queries";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { resolveLocalizedText } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const snapshot = await getDashboardSnapshot();

  const statCards = [
    {
      title: t.dashboard.totalSales,
      value: formatCurrency(snapshot.metrics.totalSales, snapshot.business.currency, locale)
    },
    {
      title: t.dashboard.totalOrders,
      value: snapshot.metrics.totalOrders.toString()
    },
    {
      title: t.common.products,
      value: snapshot.products.length.toString()
    },
    {
      title: t.common.customers,
      value: snapshot.customers.length.toString()
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t.dashboard.overviewTitle}</h1>
        <p className="mt-2 text-muted-foreground">{t.dashboard.overviewSubtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AnalyticsChart data={snapshot.metrics.revenueSeries} description={t.dashboard.monthlyRevenue} title={t.common.analytics} />
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.bestSellers}</CardTitle>
            <CardDescription>{t.dashboard.monthlyRevenue}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {snapshot.metrics.bestSellingProducts.map((item) => (
              <div className="flex items-center justify-between rounded-2xl border border-border/70 p-4" key={item.productId}>
                <div>
                  <div className="font-semibold">{resolveLocalizedText(item.name, locale)}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.units} {t.common.sold}
                  </div>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {t.common.featured}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ProductsBoard currency={snapshot.business.currency} locale={locale} products={snapshot.products.slice(0, 3)} />
      <OrdersBoard currency={snapshot.business.currency} locale={locale} orders={snapshot.orders} />
    </div>
  );
}
